import { useGetTicketDetailsById, useTicketConversation } from "../apis";
import { TicketConversationLayout } from "../components/ticket-details/ticket-conversation"

export const TicketConversationContainer = () => {
    const { isLoading, data } = useTicketConversation();
    const { data: ticketDetailsById, isLoading: ticketDetailsLoading } = useGetTicketDetailsById();

    return (
        <>
            <TicketConversationLayout data={data} isLoading={isLoading || ticketDetailsLoading} ticketDetailsById={ticketDetailsById} />
        </>
    )
}