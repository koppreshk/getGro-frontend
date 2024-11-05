import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAllConversations } from "../apis";
import { ChatList } from "../components/chat-list"

export const ChatListContainer = () => {
    const { data, isLoading, error } = useFetchAllConversations();

    if (isLoading) {
        return <CenteredCircularProgress />;
    }

    if (data) {
        return (
            <ChatList data={data} />
        )
    }

    return <span>Error: {error as never}</span>
}