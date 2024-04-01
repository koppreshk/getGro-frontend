import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { TicketConversationFooter } from "./ticket-conversation-footer";
import { TicketConversationChatContent } from "./ticket-conversation-chat-content";
import { IWhatsAppMessages, useSendWhatsAppMessages } from "modules/tickets/apis";
import image from 'assets/png/whatsapp-static-bg.jpg'

// background: ${() => {
//     const dotBg = '#f8f8fc';
//     const dotColor = 'rgba(105, 105, 255, 0.40)';
//     const dotSize = '2px';
//     const dotSpace = '22px';
//     return `
//     linear-gradient(90deg, ${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
//     linear-gradient(${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
//     ${dotColor}
//     `
// }}
//     ;

const Container = styled(FlexBox)`
    padding: 10px;
`;

export const TicketConversation = (props: { data: IWhatsAppMessages }) => {
    const { data } = props;
    const [chatData, setChatData] = React.useState(data.conversations);
    const { mutateAsync } = useSendWhatsAppMessages();

    React.useEffect(() => {
        setChatData(data.conversations);
    }, [data.conversations]);

    const onSendAction = React.useCallback((newConversation: { message: string }) => {
        setChatData((prevValue) => ([...prevValue, {
            created_at: new Date().toISOString(),
            delivered: false,
            is_agent_sent: true,
            message: newConversation.message,
            message_id: '',
            read: false
        }]))
        mutateAsync({ messageId: chatData[chatData.length - 1].message_id, message: newConversation.message })
    }, [chatData, mutateAsync])

    return (
        <FlexBox height="100%" flexDirection="column">
            <Container style={{ backgroundImage: `url(${image})` }} height="calc(100% - 117px)" flexDirection="column" gap="10px" overflowY="auto">
                {
                    chatData?.map((item, index) => <TicketConversationChatContent key={index} content={item} agentName={data.agent_name} customerName={data.customer_name} />)
                }
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </FlexBox>
    );
}
