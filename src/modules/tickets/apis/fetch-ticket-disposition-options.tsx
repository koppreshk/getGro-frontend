import React from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "lib/hooks";
import { useServiceClient } from "lib"
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

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

export interface ITicketDispositionOptions {
    tags: Tags[];
    dispositions: Dispositons[];
    queues: Queues[];
}

export const useFetchTicketDispositionOptions = () => {
    const { getData } = useServiceClient();
    const ticketChannelId = useAppSelector(state => state.tickets.ticketDetails?.channelId);

    const fetchTicketDispositionOptions = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_TICKET_DISPOSITION_OPTIONS}?channel_id=${ticketChannelId}`).then((res) => res.json()).catch((err) => err), [getData, ticketChannelId]);

    return useQuery<ITicketDispositionOptions>({
        queryKey: TicketsQueryKey.FETCH_TICKET_DISPOSITION_OPTIONS,
        queryFn: fetchTicketDispositionOptions,
        cacheTime: 0
    })
}