import React from "react";
import { DisplayTicketsGrid } from "../components";
import { useFetchAllCompletedTickets } from "../apis";

export const AllCompletedTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useFetchAllCompletedTickets();

    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;
        // TODO: temporary, needs to be removed - Highlight ticket row based on status(read or unread)
        const modifiedTicketsData = ticketsData.map((data, idx) => ({ ...data, status: idx % 3 == 0 }));

        return (
            <DisplayTicketsGrid isLoading={isLoading || isFetching} data={modifiedTicketsData} totalPages={totalTickets} />
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})