import { useGetTicketConversationById, useTicketConversation } from "../apis";
import { TicketConversationLayout } from "../components/ticket-details/ticket-conversation"

export const TicketConversationContainer = () => {
    const { isLoading, data } = useTicketConversation();
    const { data: ticketDetailsById, isLoading: ticketDetailsLoading } = useGetTicketConversationById();

    return (
        <>
            <TicketConversationLayout data={data} isLoading={isLoading || ticketDetailsLoading} ticketDetailsById={ticketDetailsById} />
        </>
    )
}