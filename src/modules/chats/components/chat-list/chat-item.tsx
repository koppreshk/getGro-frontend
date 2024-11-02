import { Typography, Avatar, Badge } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useSourceIcon } from "modules/tickets/hooks";
import styled, { css } from "styled-components";

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

const SmallAvatar = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    border-radius: 100%;
    padding: 1px;
`;


export const ChatItem = () => {
    const getSourceIcon = useSourceIcon();

    return (
        <ChatWrapper>
            <FlexBox justifyContent="center" alignItems="center">
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <SmallAvatar>
                            {getSourceIcon('whatsapp', { width: '16px', height: '16px' })}
                        </SmallAvatar>
                    }
                >
                    <Avatar sx={{ fontSize: '14px' }}>Sa</Avatar>
                </Badge>
            </FlexBox>
            <ChatContent flexDirection="column" gap="4px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 'calc(100% - 125px)', textWrap: 'nowrap' }}>{'Sanjay'}</Typography>
                    <Typography variant="caption">{'21/02/2024'}</Typography>
                </FlexBox>
                <StyledTypography variant="body2" title={''}>{'Hi, where is my order?'}</StyledTypography>
            </ChatContent>
        </ChatWrapper>
    )
} 