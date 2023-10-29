import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";
import { useAppSelector } from "lib/hooks/store-utils";

export const UnassignedTicketsContainer = React.memo(() => {
    const { itemsPerPage, pageNumber } = useAppSelector((state) => state.tickets);
    const { data, isLoading, isFetching, error } = useGetUnassignedTickets({ itemsPerPage: itemsPerPage.toString() ?? '10', pageNumber: pageNumber.toString() ?? '1' });


    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;
        return (
            <UnassignedTickets isLoading={isLoading || isFetching} data={ticketsData} totalPages={totalTickets}/>
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})