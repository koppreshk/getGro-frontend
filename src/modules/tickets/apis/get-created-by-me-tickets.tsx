import { useServiceClient } from "lib"
import React from "react";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ITicketDetails } from "./get-unassigned-tickets";

export const useGetCreatedByMeTickets = () => {

    const { getData } = useServiceClient();
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber'); 
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;

    const getCreatedByMeTickets = React.useCallback(() => getData(`${TicketsEndPoint.GET_CREATED_BY_ME_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}`).then((res) => res.json()), [_pageNumber, getData, itemsPerPage]);

    return useQuery<{data: ITicketDetails[], total_pages: number}>({
        queryFn: getCreatedByMeTickets,
        queryKey: [TicketsQueryKey.GET_CREATED_BY_ME_TICKETS]
    })
}