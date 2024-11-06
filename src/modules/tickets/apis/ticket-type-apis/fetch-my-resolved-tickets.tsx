import { useServiceClient } from "lib"
import React from "react";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ITicketDetails } from "./types";

export const useFetchMyResolvedTickets = () => {
    const { getData } = useServiceClient();
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber'); 
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;
    const search = searchParams.get('searchText');
    const _search = search ? `&search=${search}` : '';

    const getMyResolvedTickets = React.useCallback(() => getData(`${TicketsEndPoint.FETCH_MY_RESOLVED}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}${_search}`).then((res) => res.json()), [_pageNumber, _search, getData, itemsPerPage]);

    return useQuery<{data: ITicketDetails[], total_pages: number}, { message: string }>({
        queryFn: getMyResolvedTickets,
        queryKey: [TicketsQueryKey.FETCH_MY_RESOLVED]
    })
}