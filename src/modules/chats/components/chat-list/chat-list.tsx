import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { ChatItem } from "./chat-item";
import { Typography } from "@mui/material";
import { Trans } from "react-i18next";

const ChatListWrapper = styled(FlexBox)`
    height: calc(100% - 65px);
    overflow: auto;
`;

export const ChatList = () => {
    return (
        <>
            <ChatListWrapper flexDirection="column" width="100%">
                <Typography variant="h5" sx={{ p: 2 }}><Trans i18nKey="all_conversations" /></Typography>
                <ChatItem />
            </ChatListWrapper>
        </>
    )
}
