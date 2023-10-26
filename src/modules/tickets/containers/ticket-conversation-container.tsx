import { useTicketConversation } from "../apis";
import { TicketConversationLayout } from "../components/ticket-details/ticket-conversation"

export const TicketConversationContainer = () => {
    const { isLoading, data } = useTicketConversation();
    return (
        <>
            <TicketConversationLayout data={data} isLoading={isLoading} />
        </>
    )
}