import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";

export interface ITicketDetails {
    source: string;
    ticketId: string;
    customerName: string;
    ticketStatus: string;
    ticketSubStatus: string;
    createdDate: string;
    priority: string;
}

enum TicketsEndPoint {
    GET_ALL_TICKETS = 'fetch_all_tickets'
}

enum TicketsQueryKey {
    GET_ALL_TICKETS = 'GET_ALL_TICKETS'
}

export const useGetUnassignedTickets = (args: { pageNumber?: string, itemsPerPage: string }) => {
    const { itemsPerPage, pageNumber } = args;
    const { getData } = useServiceClient();
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber}&`;
    
    const getUnassignedTicketsData = React.useCallback(() => getData(`${TicketsEndPoint.GET_ALL_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage}`).then((res) => res.json()), [_pageNumber, getData, itemsPerPage]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }>({
        queryKey: [TicketsQueryKey.GET_ALL_TICKETS, pageNumber, itemsPerPage],
        queryFn: getUnassignedTicketsData,
        keepPreviousData: true
    });
}