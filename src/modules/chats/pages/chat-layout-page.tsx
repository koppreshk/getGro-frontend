import styled from "styled-components";
import { CenteredCircularProgress, ErrorMessage, FlexBox, GridLayout } from "lib/ui-ux";
import { ChatConversationsContainer, ChatDetailsLayoutContainer } from "../containers";
import { useFetchAllConversations } from "../apis";
import { ChatList } from "../components";

const StyledLayoutWrapper = styled(GridLayout)`
    background-color: ${({ theme }) => theme.pallete.white};
`;

const StyledLayouts = styled(FlexBox)`
    border-left: ${({ theme }) => theme.semantics.standardBorder};
    border-right: ${({ theme }) => theme.semantics.standardBorder};
`;

export default function ChatLayoutPage() {
    const { data, isLoading, error } = useFetchAllConversations();

    if (isLoading) {
        return <CenteredCircularProgress />;
    }

    if (data) {
        return (
            <StyledLayoutWrapper $gridTemplateColumns={'1fr 2fr 1fr'} $height={'100%'} $gridGap={'20px'}>
                <StyledLayouts width="100%">
                    <ChatList data={data} />
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

    return <ErrorMessage statusCode={error?.message} />
}