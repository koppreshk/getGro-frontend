import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";
import { useSearchParams } from "react-router-dom";

export const UnassignedTicketsContainer = React.memo(() => {
    const [searchParams] = useSearchParams();
    const noOfRecords = searchParams.get('noOfRecords');
    const pageNumber = searchParams.get('pageNumber');

    const { data, isLoading, isFetching, error } = useGetUnassignedTickets({ itemsPerPage: noOfRecords ?? '10', pageNumber: pageNumber ?? '1' });

    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;
        return (
            <UnassignedTickets isLoading={isLoading || isFetching} data={ticketsData} totalPages={totalTickets} />
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})