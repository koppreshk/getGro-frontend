import { useMatch } from "react-router-dom";
import { useFetchConversationById } from "../apis";
import { ChatConversationsLayout } from "../components/chat-conversations";
import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { FlexBox } from "lib/ui-ux";

export const ChatConversationsContainer = () => {
    const match = useMatch('/chat/:conversationId');
    const id = match?.params.conversationId;

    const { data, isLoading } = useFetchConversationById(id);

    if (isLoading) {
        return (
            <FlexBox width="100%" height="100%" flexDirection="column" padding="10px">
                <ChatConversationLoader />
            </FlexBox>
        )
    }

    if (data && id) {
        return (
            <ChatConversationsLayout data={data} conversationId={id} />
        )
    }

    return <span>Error</span>
}