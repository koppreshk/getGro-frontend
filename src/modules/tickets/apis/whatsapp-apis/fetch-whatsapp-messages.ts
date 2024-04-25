import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useParams } from "react-router-dom";

export interface IWhatsAppMessages {
    ticket_id: string;
    customer_name: string;
    agent_name: string;
    conversations: Conversation[];
}

export interface Conversation {
    message: string;
    created_at: string;
    delivered: boolean;
    read: boolean;
    message_id: string;
    is_agent_sent: boolean;
    message_type: string;
    file_url?: string;
}

export const useFetchWhatsAppMessages = () => {
    const { ticketId } = useParams();
    const { getData } = useServiceClient();

    const getOrderDetailsData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_ALL_WHATSAPP_MESSAGES}?ticket_id=${ticketId}`).then((res) => res.json()).catch((err) => err), [getData, ticketId]);
    return useQuery<IWhatsAppMessages>({
        queryKey: [TicketsQueryKey.FETCH_ALL_WHATSAPP_MESSAGES, ticketId],
        queryFn: getOrderDetailsData
    });
}