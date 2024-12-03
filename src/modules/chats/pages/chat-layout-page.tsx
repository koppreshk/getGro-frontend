import styled from "styled-components";
import { CenteredCircularProgress, ErrorMessage, FlexBox, NoDataIllustration } from "lib/ui-ux";
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
    const { data, isLoading, error, isFetching } = useFetchAllConversations();

    if (isLoading || isFetching) {
        return <CenteredCircularProgress />;
    }

    if (data) {
        return (
            <>
                {data?.conversations.length ?
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
                    : <NoDataIllustration message="No conversations to display" />}
            </>
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}