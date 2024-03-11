import { useQuery } from "react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useServiceClient } from "lib";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export interface IAttachments {
    id: string
    accountId: string | null
    contentId: string
    messageIds: string | null
    object: string | null
    contentType: string
    filename: string
    size: number
    contentDisposition: string
}

export interface Conversations {
    messageId: string
    from: string
    fromEmail: string
    to: string
    toEmail: string
    createdAt: string
    htmlContent: string
    attachments: IAttachments[];
}

export interface Tags {
    tag_id: number;
    tag: string;
}

export interface Dispositons {
    id: number;
    name: string;
}

export interface Queues {
    id: number;
    name: string;
    uniqueKey: string;
}

export interface ITicketById {
    subject: string;
    conversations: Conversations[];
    threadId: string;
    tags: Tags[];
    dispositions: Dispositons[];
    queues: Queues[];
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