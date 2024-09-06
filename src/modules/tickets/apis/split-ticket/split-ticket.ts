import { useServiceClient } from "lib"
import React from "react";
import { useMutation } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";

interface ISplitTicketData {
    ticket_id: string;
    subject: string;
    description: string;
    ticket_assignee_type: 'auto' | 'manual';
    copy_attachments: boolean;
    association_type: 'link_ticket';
}

export const useSplitTicket = (props: {
    assignedTo: string,
    queueId: string
}) => {
    const { assignedTo, queueId } = props
    const { postData } = useServiceClient();

    const splitTicket = React.useCallback(async (args: ISplitTicketData) => {
        let queryParams = '';
        
        if (args.ticket_assignee_type === 'manual') {
            queryParams = `?assigned_to=${assignedTo}&queue_id=${queueId}`;
        }

        const url = `${TicketsEndPoint.SPLIT_TICKET}${queryParams}`;
        const res = await postData(url, args);
        
        return await res.json();
    }, [assignedTo, postData, queueId]);

    return useMutation({
        mutationFn: splitTicket,
        mutationKey: TicketsQueryKey.SPLIT_TICKET
    })
}