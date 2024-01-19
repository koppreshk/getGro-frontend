import React from "react";
import styled from "styled-components";
import { FlexBox } from "lib/ui-ux";
import { ITicketConversationLayoutProps } from "./ticket-conversation-layout";
import { TicketConversationFooter } from "./ticket-conversation-footer";
import { TicketConversationChatContent } from "./ticket-conversation-chat-content";
import { ChatConversationLoader } from "lib/ui-ux/loader-components";

const Container = styled(FlexBox)`
	background: ${() => {
        const dotBg = '#f8f8fc';
        const dotColor = 'rgba(105, 105, 255, 0.40)';
        const dotSize = '2px';
        const dotSpace = '22px';
        return `
        linear-gradient(90deg, ${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
		linear-gradient(${dotBg} calc(${dotSpace} - ${dotSize}), transparent 1%) center / ${dotSpace} ${dotSpace},
		${dotColor}
        `
    }}
		;
    padding: 10px;
`;

export const TicketConversation = (props: Pick<ITicketConversationLayoutProps, 'data' | 'isLoading'>) => {
    const { data, isLoading } = props;
    const [chatData, setChatData] = React.useState(data.chatConversation);

    React.useEffect(() => {
        setChatData(data.chatConversation);
    }, [data.chatConversation]);

    const onSendAction = React.useCallback((newConversation: { custumerQuery?: string, agentQuery?: string }) => {
        setChatData((prevValue) => ([...prevValue, newConversation]))
    }, [])

    return (
        <FlexBox height="calc(100% - 84px);" flexDirection="column" gap="10px">
            <Container height="calc(80% - 10px)" flexDirection="column" gap="10px" overflowY="auto">
                {isLoading ? <ChatConversationLoader />
                    :
                    chatData?.map((item, index) => <TicketConversationChatContent key={index} content={item} agentName={data.agentName} customerName={data.customerName} />)}
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </FlexBox>
    );
}
