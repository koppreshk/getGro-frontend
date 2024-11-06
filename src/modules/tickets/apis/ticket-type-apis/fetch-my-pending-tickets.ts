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
    const search = searchParams.get('searchText');
    const _search = search ? `&search=${search}` : '';

    const fetchMyPendingData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_MY_PENDING}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}${_search}`).then((res) => res.json()), [_pageNumber, _search, getData, itemsPerPage]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }, { message: string }>({
        queryKey: [TicketsQueryKey.FETCH_MY_PENDING, pageNumber, itemsPerPage, search],
        queryFn: fetchMyPendingData,
        keepPreviousData: true
    });
}