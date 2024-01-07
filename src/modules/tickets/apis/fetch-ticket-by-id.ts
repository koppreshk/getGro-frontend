import { useQuery } from "react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useServiceClient } from "lib";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export interface Conversations {
    messageId: string
    from: string
    fromEmail: string
    to: string
    toEmail: string
    createdAt: string
    htmlContent: string
    attachments: [];
}

export interface ITicketById {
    subject: string
    conversations: Conversations[]
    threadId: string
}

export const useFetchTicketById = () => {
    const { ticketId } = useParams();
    const { getData } = useServiceClient();

    const getOrderDetailsData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_TICKET_BY_ID}?ticket_id=${ticketId}`).then((res) => res.json()).catch((err) => err), [getData, ticketId]);
    return useQuery<ITicketById>({
        queryKey: [TicketsQueryKey.FETCH_TICKET_BY_ID, ticketId],
        queryFn: getOrderDetailsData,
        cacheTime: 0
    });
}