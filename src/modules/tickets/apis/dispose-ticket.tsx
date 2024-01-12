import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { useServiceClient } from "lib"
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";

export interface IDisposeTicketArgs {
    dispositionType: string;
    remarks?: string;
    callBackRequired?: boolean;
    parentFolder?: string;
    childFolder?: string;
}

export const useDisposeTicket = () => {
    const { ticketId } = useParams();
    const { postData } = useServiceClient();

    const disposeTicket = useCallback((args: IDisposeTicketArgs) =>
        postData(`${TicketsEndPoint.DISPOSE_TICKET}?status=${args.dispositionType}&ticket_id=${ticketId}`).then((res) => res.json()), [postData, ticketId]);

    return useMutation({
        mutationKey: [TicketsQueryKey.DISPOSE_TICKET],
        mutationFn: disposeTicket
    });
}