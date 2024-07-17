import React from "react";
import { useFetchAllTickets } from "modules/tickets/apis";
// import { DisplayTicketsGrid } from "modules/tickets/components";
import { TicketsCardview } from "modules/tickets/components/tickets-card-view";

export const AllTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useFetchAllTickets();

    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;
        // TODO: temporary, needs to be removed - Highlight ticket row based on status(read or unread)
        const modifiedTicketsData = ticketsData.map((data, idx) => ({ ...data, status: idx % 3 == 0 }));

        return (
            <TicketsCardview isLoading={isLoading || isFetching} data={modifiedTicketsData} totalPages={totalTickets} />
        )
    }

    return (
        <span>Error: {error as never}</span>
    )
})