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

export const ChatItem = () => {

    return (
        <ChatWrapper>
            <FlexBox justifyContent="center" alignItems="center">
                <CustomSourceAvatar />
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
