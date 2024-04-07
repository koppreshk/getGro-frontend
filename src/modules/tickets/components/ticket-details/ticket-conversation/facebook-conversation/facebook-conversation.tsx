import React from "react";
import { FlexBox } from "lib/ui-ux";
import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { ITicketConversation } from "modules/tickets/apis";
import { FacebookConversationChatContent } from "./facebook-conversation-chat-content";
import { TicketConversationFooter } from "../instagram-conversations";
import { Container } from "..";

export const FacebookConversation = (props: { data: ITicketConversation, isLoading?: boolean }) => {
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
                        chatData?.map((item, index) => <FacebookConversationChatContent key={index} content={item} agentName={data.agentName} customerName={data.customerName} />)}
                </FlexBox>
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </FlexBox>
    );
}
