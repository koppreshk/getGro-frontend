import React from "react";
import { useMergeTickets } from "modules/tickets/apis";
import { MergeTicketsContent } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview/more-actions/merge-ticket/merge-tickets-content";


export const MergeTicketsContainer = () => {
    const { mutateAsync } = useMergeTickets();

    const submitMergeTicketHandler = React.useCallback(() => {
        mutateAsync({
            secondary_ticket_ids: [""],
            primary_ticket_id: "",
            close_secondary_ticket: true,
            add_secondary_ticket_message: "first_message",
            send_email: true,
            add_secondary_link_in_primary: true,
        })
    }, [mutateAsync]);

    return <MergeTicketsContent submitMergeTicketHandler={submitMergeTicketHandler} />
}