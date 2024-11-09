import styled from "styled-components";
import { CenteredCircularProgress, ErrorMessage, FlexBox } from "lib/ui-ux";
import { ChatConversationsContainer, ChatDetailsLayoutContainer } from "../containers";
import { useFetchAllConversations } from "../apis";
import { ChatList } from "../components";

const StyledLayoutWrapper = styled(FlexBox)`
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

    if (data?.conversations.length) {
        return (
            <StyledLayoutWrapper height={'100%'} gap={'20px'}>
                <StyledLayouts width="calc(25% - 20px)">
                    <ChatList data={data} />
                </StyledLayouts>
                <StyledLayouts width="calc(50% - 20px)">
                    <ChatConversationsContainer />
                </StyledLayouts>
                <StyledLayouts width="25%">
                    <ChatDetailsLayoutContainer />
                </StyledLayouts>
            </StyledLayoutWrapper>
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}