import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchConversationById } from "../apis";
import { ChatConversations } from "../components/chat-conversations";

export const ChatConversationsContainer = () => {
    const { data, isLoading } = useFetchConversationById();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <ChatConversations data={data} />
        )
    }

    return <span>Error</span>
}