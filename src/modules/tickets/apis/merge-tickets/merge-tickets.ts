import React from "react";
import { useMutation } from "react-query";
import { useServiceClient } from "lib";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";

interface IMergeTicketsData {
    secondary_ticket_ids: string[];
    primary_ticket_id: string;
    close_secondary_ticket: boolean;
    add_secondary_ticket_message: "first_message" | "last_message";
    send_email: boolean;
    add_secondary_link_in_primary: boolean;
}

export const useMergeTickets = () => {
    const { postData } = useServiceClient();

    const mergeTickets = React.useCallback((args: IMergeTicketsData) => 
        postData(TicketsEndPoint.MERGE_TICKETS, args).then((res) => res.json()), [postData])

    return useMutation({
        mutationKey: TicketsQueryKey.MERGE_TICKETS,
        mutationFn: mergeTickets,
    });
}