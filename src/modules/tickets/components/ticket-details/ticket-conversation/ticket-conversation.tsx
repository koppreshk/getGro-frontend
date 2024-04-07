import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { TicketConversationFooter } from "./ticket-conversation-footer";
import { TicketConversationChatContent } from "./ticket-conversation-chat-content";
import { IWhatsAppMessages, useSendWhatsAppMessages } from "modules/tickets/apis";
import { Container } from ".";

const ConversationWrapper = styled(FlexBox)`
    position: relative;
`
export const TicketConversation = (props: { data: IWhatsAppMessages }) => {
    const { data } = props;
    const [chatData, setChatData] = React.useState(data.conversations);
    const { mutateAsync } = useSendWhatsAppMessages();

    React.useEffect(() => {
        setChatData(data.conversations);
    }, [data.conversations]);

    const onSendAction = React.useCallback((newConversation: { message: string; fileUrl?: string, type: string }) => {
        setChatData((prevValue) => ([...prevValue, {
            created_at: new Date().toISOString(),
            delivered: false,
            is_agent_sent: true,
            message: newConversation.message,
            message_id: '',
            read: false,
            file_url: newConversation.fileUrl,
            message_type: newConversation.type
        }]))
        mutateAsync({
            messageId: chatData[chatData.length - 1].message_id,
            message: newConversation.message,
            fileUrl: newConversation.fileUrl,
            type: newConversation.type
        })
    }, [chatData, mutateAsync])

    return (
        <ConversationWrapper height="100%" flexDirection="column">
            <Container>
                <FlexBox height="calc(100% - 150px)" flexDirection="column" gap="10px" overflowY="auto" padding="10px">
                    {
                        chatData?.map((item, index) => <TicketConversationChatContent key={index} content={item} agentName={data.agent_name} customerName={data.customer_name} />)
                    }
                </FlexBox>
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </ConversationWrapper>
    );
}
