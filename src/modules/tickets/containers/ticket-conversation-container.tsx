import { useFetchTicketById, useGetTicketDetailsById, useTicketConversation } from "../apis";
import { TicketConversationLayout } from "../components/ticket-details/ticket-conversation"

export const TicketConversationContainer = () => {
    const { isLoading, data } = useTicketConversation();
    const { data: ticketDetailsById, isLoading: ticketDetailsLoading } = useGetTicketDetailsById();
    const { data: conversationsData, isLoading: conversationLoading } = useFetchTicketById();

    return (
        <>
            <TicketConversationLayout
                data={data}
                conversationsData={conversationsData}
                isLoading={isLoading || conversationLoading || ticketDetailsLoading}
                ticketDetailsById={ticketDetailsById} />
        </>
    )
}