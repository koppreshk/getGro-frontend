import React from "react";
import { useMergeTickets } from "modules/tickets/apis";
import { IMergeTicketsFormFields, MergeTicketsContent } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview/more-actions/merge-ticket/merge-tickets-content";


export const MergeTicketsContainer = (props: { onCloseDrawer: () => void }) => {
    const { onCloseDrawer } = props;
    const { mutateAsync, isLoading } = useMergeTickets();

    const submitMergeTicketHandler = React.useCallback((formData: IMergeTicketsFormFields & { primaryTicketId: string }) => {
        const { addSecondaryLinkInPrimary, addSecondaryTicketMessage, closeSecondaryTicket, sendMail, searchTickets, primaryTicketId } = formData;
        return mutateAsync({
            secondary_ticket_ids: searchTickets?.map((item) => item.ticketId) || [],
            primary_ticket_id: primaryTicketId,
            close_secondary_ticket: closeSecondaryTicket,
            add_secondary_ticket_message: addSecondaryTicketMessage,
            send_email: !sendMail,
            add_secondary_link_in_primary: addSecondaryLinkInPrimary,
        })
    }, [mutateAsync]);

    return <MergeTicketsContent submitMergeTicketHandler={submitMergeTicketHandler} onCloseDrawer={onCloseDrawer} mutationLoading={isLoading} />
}