import { useMatch } from "react-router-dom";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchConversationById } from "../apis";
import { ChatConversations } from "../components/chat-conversations";

export const ChatConversationsContainer = () => {
    const match = useMatch('/chat/:conversationId');
    const id = match?.params.conversationId;

    const { data, isLoading } = useFetchConversationById(id);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data && id) {
        return (
            <ChatConversations data={data} conversationId={id} />
        )
    }

    return <span>Error</span>
}