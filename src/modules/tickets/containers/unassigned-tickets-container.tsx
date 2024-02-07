import React from "react";
import { DisplayTicketsGrid } from "../components";
import { useGetUnassignedTickets } from "../apis";
import { ErrorMessage } from "lib/ui-ux";

export const UnassignedTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useGetUnassignedTickets();

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
        <ErrorMessage statusCode={error?.message} />
    )
})