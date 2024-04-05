import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useServiceClient } from "lib"
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

interface IDisposeTicketArgs {
    dispositionId: string;
    queueId?: string;
    employeeId?: string;
    tagId?: string[];
    remarks?: string;
    callBackTime?: string;
}

export const useDisposeTicket = () => {
    const { ticketId } = useParams();
    const { postData } = useServiceClient();

    const disposeTicket = useCallback((args: IDisposeTicketArgs) => postData(TicketsEndPoint.DISPOSE_TICKET,
        {
            disposition_id: args.dispositionId,
            queue_id: args.queueId,
            employee_id: args.employeeId,
            tag_id: args.tagId,
            ticket_id: ticketId,
            call_back_at: args.callBackTime
        }).then((res) => res.json()), [postData, ticketId]);

    return useMutation({
        mutationKey: [TicketsQueryKey.DISPOSE_TICKET],
        mutationFn: disposeTicket
    });
}