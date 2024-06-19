import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useSearchParams } from "react-router-dom";
import { ITicketDetails } from "./types";

export const useFetchMyPendingTickets = () => {
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const { getData } = useServiceClient();
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;

    const fetchMyPendingData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_MY_PENDING}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}`).then((res) => res.json()), [_pageNumber, getData, itemsPerPage]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }>({
        queryKey: [TicketsQueryKey.FETCH_MY_PENDING, pageNumber, itemsPerPage],
        queryFn: fetchMyPendingData,
        keepPreviousData: true
    });
}