import { useMemo } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled, { css } from "styled-components";
import { CustomSourceAvatar } from "./custom-source-avatar";

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

export interface ChatItemProps {
    customerName: string;
    createdAt: string;
    message: string;
    source: string;
    conversationId: string;
}

export const ChatItem = (props: ChatItemProps) => {
    const { customerName, createdAt, message, source, conversationId } = props;

    const match = useMatch('/chat/:conversationId');
    const navigate = useNavigate();

    const isChatActive = useMemo(() => match?.params.conversationId === conversationId.toString(), [conversationId, match?.params.conversationId]);

    const onChatItemClick = () => {
        navigate(`/chat/${conversationId}`);
    }

    return (
        <ChatWrapper onClick={onChatItemClick} $isChatActive={isChatActive}>
            <FlexBox justifyContent="center" alignItems="center">
                <CustomSourceAvatar source={source} customerName={customerName} />
            </FlexBox>
            <ChatContent flexDirection="column" gap="4px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 'calc(100% - 125px)', textWrap: 'nowrap' }}>{customerName}</Typography>
                    <Typography variant="caption">{createdAt}</Typography>
                </FlexBox>
                <StyledTypography variant="body2" title={message}>{message}</StyledTypography>
            </ChatContent>
        </ChatWrapper>
    )
}
