import { FlexBox, GridLayout } from "lib/ui-ux";
import { ChatListContainer } from "../containers";
import styled from "styled-components";

const StyledLayoutWrapper = styled(GridLayout)`
    background-color: ${({ theme }) => theme.pallete.white};
`;

const StyledLayouts = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

export default function ChatLayoutPage() {
    return (
        <StyledLayoutWrapper $gridTemplateColumns={'1fr 2fr 1fr'} $height={'100%'}>
            <StyledLayouts width="100%">
                <ChatListContainer />
            </StyledLayouts>
            <StyledLayouts width="100%">
            </StyledLayouts>
            <StyledLayouts width="100%">
            </StyledLayouts>
        </StyledLayoutWrapper>
    )
}