import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useSearchParams } from "react-router-dom";
import { ITicketDetails } from "./get-unassigned-tickets";

export const useFetchAllPendingTickets = () => {
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const { getData } = useServiceClient();
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;

    const fetchAllPendingData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_ALL_PENDING_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}`).then((res) => res.json()), [_pageNumber, getData, itemsPerPage]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }>({
        queryKey: [TicketsQueryKey.FETCH_ALL_PENDING_TICKETS, pageNumber, itemsPerPage],
        queryFn: fetchAllPendingData,
        keepPreviousData: true
    });
}