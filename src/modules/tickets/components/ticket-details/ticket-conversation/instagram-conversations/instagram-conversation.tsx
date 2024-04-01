import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { ITicketConversation } from "modules/tickets/apis";
import { TicketConversationFooter } from "../ticket-conversation-footer";
import { InstagramConversationChatContent } from "./instagram-conversation-chat-content";

const Container = styled(FlexBox)`
    padding: 10px;
`;

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
            <Container height="calc(100% - 117px)" flexDirection="column" gap="10px" overflowY="auto">
                {isLoading ? <ChatConversationLoader />
                    :
                    chatData?.map((item, index) => <InstagramConversationChatContent key={index} content={item} agentName={data.agentName} customerName={data.customerName} />)}
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </FlexBox>
    );
}
