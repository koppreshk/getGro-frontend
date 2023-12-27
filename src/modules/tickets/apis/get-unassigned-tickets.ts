import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useSearchParams } from "react-router-dom";

export interface ITicketDetails {
    source: string;
    ticketId: string;
    customerName: string;
    ticketStatus: string;
    ticketSubStatus: string;
    createdAt: string;
    priority: string;
    status: boolean;
}

export const useGetUnassignedTickets = () => {
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const { getData } = useServiceClient();
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;

    const getUnassignedTicketsData = React.useCallback(() => getData(`${TicketsEndPoint.GET_ALL_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}`).then((res) => res.json()), [_pageNumber, getData, itemsPerPage]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }>({
        queryKey: [TicketsQueryKey.GET_ALL_TICKETS, pageNumber, itemsPerPage],
        queryFn: getUnassignedTicketsData,
        keepPreviousData: true
    });
}