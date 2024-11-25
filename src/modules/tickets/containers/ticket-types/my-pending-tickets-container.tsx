import { ErrorMessage } from "lib/ui-ux";
import { useFetchMyPendingTickets } from "modules/tickets/apis";
import { TicketsByView } from "modules/tickets/components";
import React from "react";

export const MyPendingTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useFetchMyPendingTickets();

    if (data || isLoading) {
        const ticketsData = data?.data ?? [];
        const totalTickets = data?.total_pages ?? 0;

        return (
            <TicketsByView isLoading={isLoading || isFetching} data={ticketsData} totalPages={totalTickets} />
        )
    }

    return (
        <ErrorMessage statusCode={error?.message} />
    )
})