import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { ChatItem } from "./chat-item";
import { Typography } from "@mui/material";
import { Trans } from "react-i18next";
import { useMatch, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

const ChatListWrapper = styled(FlexBox)`
    height: calc(100% - 65px);
    overflow: auto;
`;

const chatListData = [{
    customerName: 'Sanjay',
    createdAt: '21/02/2024',
    message: 'Hi, where is my order?',
    conversationId: '44',
    source: 'whatsapp'
}, {
    customerName: 'Koppresh P',
    createdAt: '17/09/2024',
    message: 'Hi, Refund not received',
    conversationId: '24',
    source: 'whatsapp'
}];

export const ChatList = () => {
    const navigate = useNavigate();
    const match = useMatch('/chat/:conversationId');

    const doesconversationIdExist = useMemo(() => chatListData.some((item) => item.conversationId.toString() === match?.params.conversationId), [match?.params.conversationId]);

    useEffect(() => {
        if (!doesconversationIdExist) {
            navigate(`/chat/${chatListData[0].conversationId}`)
        }
    }, [doesconversationIdExist, navigate]);

    return (
        <>
            <ChatListWrapper flexDirection="column" width="100%">
                <Typography variant="h5" sx={{ p: 2 }}><Trans i18nKey="all_chatListData" /></Typography>
                {chatListData.map((item) => <ChatItem key={item.conversationId} {...item} />)}
            </ChatListWrapper>
        </>
    )
}
