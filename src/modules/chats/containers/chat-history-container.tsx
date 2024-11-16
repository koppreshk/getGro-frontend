import { useMatch } from "react-router-dom"
import { useFetchChatHistory } from "../apis";
import { CenteredCircularProgress } from "lib/ui-ux";
import { ChatHistory } from "../components";

export const ChatHistoryContainer = () => {
    const match = useMatch('/chat/:conversationId');
    const id = match?.params.conversationId;

    const { data, isLoading } = useFetchChatHistory(id!);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data && id) {
        return (
            <ChatHistory historyData={data} useTimeAgoDate />
        )
    }

    return <span>Error</span>
}