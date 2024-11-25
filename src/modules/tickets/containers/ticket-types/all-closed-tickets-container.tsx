import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllClosedTickets } from "modules/tickets/apis";
import { TicketsByView } from "modules/tickets/components";
import React from "react";

export const AllClosedTicketsContainer = React.memo(() => {
    const { data, isLoading, isFetching, error } = useFetchAllClosedTickets();

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