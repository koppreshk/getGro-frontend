import { useParams } from "react-router-dom"
import { useGetUnassignedTickets } from "./get-unassigned-tickets";

export const useGetTicketConversationById = () => {
    const { ticketId } = useParams();
    const { data, ...rest } = useGetUnassignedTickets();

    if (data) {
        const item = data.data.find((item) => item.ticketId === ticketId);
        return {
            data: item!, ...rest
        }
    }

    return { data: undefined, ...rest }

}