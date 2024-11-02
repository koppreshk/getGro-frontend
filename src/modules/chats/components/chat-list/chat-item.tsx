import { FlexBox } from "lib/ui-ux";
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

export const ChatItem = () => {
    return (
        <ChatWrapper>
            ChatItem
        </ChatWrapper>
    )
} 