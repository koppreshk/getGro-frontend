import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { ChatItem } from "./chat-item";
import { Typography } from "@mui/material";
import { Trans } from "react-i18next";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { AllChatConversations } from "modules/chats/apis";

const ChatListWrapper = styled(FlexBox)`
    height: calc(100% - 54px);
`;

interface ChatListProps {
    data: AllChatConversations;
}

export const ChatList = (props: ChatListProps) => {
    const { data } = props;
    const navigate = useNavigate();
    const match = useMatch('/chat/:conversationId');

    const doesconversationIdExist = useMemo(() => data.conversations.some((item) => item.id.toString() === match?.params.conversationId), [data.conversations, match?.params.conversationId]);

    useEffect(() => {
        if (!doesconversationIdExist) {
            navigate(`${data.conversations[0].id}`)
        }
    }, [data.conversations, doesconversationIdExist, navigate]);

    return (
        <FlexBox flexDirection="column" height="100%" width="100%">
            <Typography variant="h5" sx={{ p: 2 }}><Trans i18nKey="all_conversations" /></Typography>
            <ChatListWrapper flexDirection="column" width="100%" overflowY="auto">
                {data.conversations.map((item) => <ChatItem key={item.id} {...item} />)}
            </ChatListWrapper>
        </FlexBox>
    )
}
