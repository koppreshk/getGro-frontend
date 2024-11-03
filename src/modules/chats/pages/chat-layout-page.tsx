import styled from "styled-components";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { ChatConversationsContainer, ChatDetailsLayoutContainer, ChatListContainer } from "../containers";

const StyledLayoutWrapper = styled(GridLayout)`
    background-color: ${({ theme }) => theme.pallete.white};
`;

const StyledLayouts = styled(FlexBox)`
    border-left: ${({ theme }) => theme.semantics.standardBorder};
    border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

export default function ChatLayoutPage() {
    return (
        <StyledLayoutWrapper $gridTemplateColumns={'1fr 2fr 1fr'} $height={'100%'} $gridGap={'20px'}>
            <StyledLayouts width="100%">
                <ChatListContainer />
            </StyledLayouts>
            <StyledLayouts width="100%">
                <ChatConversationsContainer />
            </StyledLayouts>
            <StyledLayouts width="100%">
                <ChatDetailsLayoutContainer />
            </StyledLayouts>
        </StyledLayoutWrapper>
    )
}