import { useMemo } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled, { css } from "styled-components";
import { CustomSourceAvatar } from "./custom-source-avatar";
import { ChatConversation } from "modules/chats/apis";

const ChatWrapper = styled(FlexBox) <{ $isChatActive: boolean }>`
    padding: 15px 10px 15px 15px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
    cursor: pointer;

    ${({ $isChatActive }) => $isChatActive && css`
        background-color: ${(props) => props.theme.pallete.purpleLight};
        border-left-width: 4px;
        border-style: solid;
        border-color: ${(props) => props.theme.pallete.primaryPurple};
        border-width: 0;
        border-left-width: thick;
    `}
`;

const ChatContent = styled(FlexBox)`
    margin-left: 15px;
    width: calc(100% - 55px);
`;

const StyledTypography = styled(Typography)`
    && {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: ${(props) => props.theme.pallete.grayNeutral};
    }
`;

export const ChatItem = (props: ChatConversation) => {
    const { chat_source, created_at, customer_name, id, last_message } = props;

    const match = useMatch('/chat/:conversationId');
    const navigate = useNavigate();

    const isChatActive = useMemo(() => match?.params.conversationId === id.toString(), [id, match?.params.conversationId]);

    const onChatItemClick = () => {
        navigate(`/chat/${id}`);
    }

    return (
        <ChatWrapper onClick={onChatItemClick} $isChatActive={isChatActive}>
            <FlexBox justifyContent="center" alignItems="center">
                <CustomSourceAvatar chat_source={chat_source} customer_name={customer_name} />
            </FlexBox>
            <ChatContent flexDirection="column" gap="4px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 'calc(100% - 125px)', textWrap: 'nowrap' }}>{customer_name}</Typography>
                    <Typography variant="caption">{created_at}</Typography>
                </FlexBox>
                <StyledTypography variant="body2" title={last_message}>{last_message}</StyledTypography>
            </ChatContent>
        </ChatWrapper>
    )
}
