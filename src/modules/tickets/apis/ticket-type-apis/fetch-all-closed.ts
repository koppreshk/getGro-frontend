import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useSearchParams } from "react-router-dom";
import { ITicketDetails } from "./types";

export const useFetchAllClosedTickets = () => {
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const { getData } = useServiceClient();
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;
    const search = searchParams.get('searchText');
    const _search = search ? `&search=${search}` : '';

    const fetchAllClosedData = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_ALL_CLOSED_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}${_search}`).then((res) => res.json()), [_pageNumber, _search, getData, itemsPerPage]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }, { message: string }>({
        queryKey: [TicketsQueryKey.FETCH_ALL_CLOSED_TICKETS, pageNumber, itemsPerPage, search],
        queryFn: fetchAllClosedData,
        keepPreviousData: true
    });
}