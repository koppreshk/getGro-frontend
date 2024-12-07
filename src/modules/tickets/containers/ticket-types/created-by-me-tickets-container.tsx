import { ErrorMessage } from "lib/ui-ux";
import { useFetchMyResolvedTickets } from "modules/tickets/apis";
import { TicketsByView } from "modules/tickets/components";
import React from "react";

export const MyResolvedTicketsContainer = React.memo(() => {
    const { data, error, isLoading, isFetching } = useFetchMyResolvedTickets();

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