import React from "react";
import { FlexBox, TextArea } from "lib/ui-ux";
import { Send } from "@mui/icons-material";
import { KeyCodes } from "lib/enums";
import { RoundedSendButton } from "./email-conversations/email-editor";
import { FileUploadField } from "lib/form-fields";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

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
