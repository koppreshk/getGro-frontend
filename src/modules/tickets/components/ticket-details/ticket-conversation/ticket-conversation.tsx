import React from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { ITicketConversationLayoutProps } from "./ticket-conversation-layout";
import { TicketConversationFooter } from "./ticket-conversation-footer";
import { TicketConversationChatContent } from "./ticket-conversation-chat-content";



const Container = styled(FlexBox)`

	background: ${() => {
        const dotBg = '#f8f8fc';
        const dotColor = 'rgba(105, 105, 255, 0.7)';
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
        <FlexBox $height="calc(100% - 84px);" $flexDirection="column" $gap="10px">
            <Container $height="calc(80% - 10px)" $flexDirection="column" $gap="10px" $overflowY="auto">
                {isLoading
                    ? Array(10).fill({}).map((_item, index) => (
                        <FlexBox $gap={'10px'} $alignItems="center" $width="100%" key={index} $flexDirection={index % 2 == 0 ? 'row' : 'row-reverse'}>
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton width={310} height={40} />
                        </FlexBox>
                    ))
                    :
                    chatData?.map((item, index) => <TicketConversationChatContent key={index} content={item} agentName={data.agentName} customerName={data.customerName} />)}
            </Container>
            <TicketConversationFooter onSendAction={onSendAction} />
        </FlexBox>
    );
}
