import React from "react";
import { useServiceClient } from "lib";
import { useQuery } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useSearchParams } from "react-router-dom";
import { ITicketDetails } from "./get-unassigned-tickets";

export const useGetTicketsDataByKey = (queryEndPoint: keyof typeof TicketsEndPoint, queryKey: keyof typeof TicketsQueryKey) => {
    const [searchParams] = useSearchParams();
    const itemsPerPage = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');
    const { getData } = useServiceClient();
    const _pageNumber = pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;

    const getTicketsData = React.useCallback(() => getData(`${TicketsEndPoint[queryEndPoint]}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}`).then((res) => res.json()), [_pageNumber, getData, itemsPerPage, queryEndPoint]);
    return useQuery<{ data: ITicketDetails[], total_pages: number }>({
        queryKey: [TicketsQueryKey[queryKey], pageNumber, itemsPerPage],
        queryFn: getTicketsData,
        keepPreviousData: true
    });
}