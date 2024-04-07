import React from "react";
import styled from "styled-components";
import { FlexBox, TextArea } from "lib/ui-ux";
import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { ITicketConversation } from "modules/tickets/apis";
import { InstagramConversationChatContent } from "./instagram-conversation-chat-content";
import { FormProvider, useForm } from "react-hook-form";
import { Send } from "@mui/icons-material";
import { KeyCodes } from "lib/enums";
import { FileUploadField } from "lib/form-fields";
import { RoundedSendButton } from "../email-conversations/email-editor";
import { Container } from "..";


export const InstagramConversation = (props: { data: ITicketConversation, isLoading?: boolean }) => {
    const { data, isLoading } = props;
    const [chatData, setChatData] = React.useState(data.chatConversation);

    React.useEffect(() => {
        setChatData(data.chatConversation);
    }, [data.chatConversation]);

    const onSendAction = React.useCallback((newConversation: { message: string }) => {
        setChatData((prevValue) => ([...prevValue, { date: new Date().toISOString(), agentQuery: newConversation.message, agtMsgDeliveryStatus: 'sent' }]))
    }, [])

    return (
        <FlexBox height="100%" flexDirection="column">
            <Container>
                <FlexBox height="calc(100% - 150px)" flexDirection="column" gap="10px" overflowY="auto" padding="10px">
                    {isLoading ? <ChatConversationLoader />
                        :
                        chatData?.map((item, index) => <InstagramConversationChatContent key={index} content={item} agentName={data.agentName} customerName={data.customerName} />)}
                </FlexBox>
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </FlexBox>
    );
}

interface ITicketConversationFooterProps {
    onSendAction: (newConversation: {
        message: string;
    }) => void;
}

const FooterWrapper = styled(FlexBox)`
    border-top: ${({ theme }) => theme.semantics.standardBorder} ;
`;

export const TicketConversationFooter = (props: ITicketConversationFooterProps) => {
    const { onSendAction } = props;
    const [textareaValue, setTextAreaValue] = React.useState('');
    const form = useForm();

    const onTextChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        setTextAreaValue(ev.target.value);
    }, []);

    const onSendClick = React.useCallback(() => {
        if (textareaValue.length) {
            onSendAction({ message: textareaValue });
            setTextAreaValue('');
        }
    }, [onSendAction, textareaValue]);

    const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = React.useCallback((ev) => {
        if (ev.key === KeyCodes.EnterKey && !ev.shiftKey) {
            onSendClick();
            ev.preventDefault();
        }
    }, [onSendClick]);

    return (
        <FormProvider {...form}>
            <FooterWrapper flexDirection="column" >
                <TextArea onChange={onTextChange} value={textareaValue} onKeyDown={onKeyDown} placeholder="Shift + Enter to add a new line" />
                <FlexBox justifyContent="space-between" padding="0px 10px 10px">
                    <FileUploadField name={'attachments'} multiple readMode="readAsDataURL" />
                    <RoundedSendButton variant="contained" size="small" endIcon={<Send />} onClick={onSendClick} >
                        Send
                    </RoundedSendButton>
                </FlexBox>
            </FooterWrapper>
        </FormProvider>
    )
}
