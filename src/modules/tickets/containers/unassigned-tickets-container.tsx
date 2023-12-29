import React from "react";
import { UnassignedTickets } from "../components";
import { useGetUnassignedTickets } from "../apis";

export const UnassignedTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useGetUnassignedTickets();

    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;
        // TODO: temporary, needs to be removed 
        const modifiedTicketsData = ticketsData.map((data, idx) => ({ ...data, status: idx % 3 == 0 }));

        return (
            <UnassignedTickets isLoading={isLoading || isFetching} data={modifiedTicketsData} totalPages={totalTickets} />
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})