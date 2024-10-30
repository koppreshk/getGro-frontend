import { TicketsByView } from "modules/tickets/components";
import { useFetchAllPendingTickets } from "modules/tickets/apis";
import React from "react";
import { ErrorMessage } from "lib/ui-ux";

export const AllPendingTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useFetchAllPendingTickets();

    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;
        // TODO: temporary, needs to be removed - Highlight ticket row based on status(read or unread)
        const modifiedTicketsData = ticketsData.map((data, idx) => ({ ...data, status: idx % 3 == 0 }));

        return (
            <TicketsByView isLoading={isLoading || isFetching} data={modifiedTicketsData} totalPages={totalTickets} />
        )
    }

    return (
        <ErrorMessage statusCode={error?.message} />
    )
})