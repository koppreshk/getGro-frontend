import { useServiceClient } from "lib";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useMutation } from "react-query";
import React from "react";
import { ITicketDetails } from "..";

export interface ISearchTickets {
    data: Pick<ITicketDetails, 'customerName' | 'ticketId' | 'ticketStatus' | 'description'>[],
    total_pages: number,
    current_page: number
}

type SearchTicketArgs = {
    search_text: string;
    current_ticket_id: string
}

export const useSearchTickets = () => {
    const { postData } = useServiceClient();

    const mergeTickets = React.useCallback((args: SearchTicketArgs) =>
        postData(TicketsEndPoint.SEARCH_TICKETS, args).then((res) => res.json()), [postData])

    return useMutation<ISearchTickets, unknown, SearchTicketArgs, unknown>({
        mutationKey: TicketsQueryKey.SEARCH_TICKETS,
        mutationFn: mergeTickets,
    })
}