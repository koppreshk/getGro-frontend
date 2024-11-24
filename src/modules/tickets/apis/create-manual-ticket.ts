import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "./api-enums";
import { useGetQueryEndPoint } from "../containers";

interface ICreateManualTicketArgs {
    requester_email: string;
    subject: string;
    description: string;
    ticket_assignee_type: 'auto' | 'manual'
    priority_id: string;
    tags: string[];
    queue_id?: string;
    assigned_to?: string;
    /**
     * For chats only, send the below id so that ticket is created and linked
     */
    conversation_id?: string | number;
}

export const useCreateManualTicket = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    const queryKey = useGetQueryEndPoint();

    const createManualTicket = useCallback((args: ICreateManualTicketArgs) =>
        postData(`${TicketsEndPoint.CREATE_MANUAL_TICKET}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: [TicketsQueryKey.CREATE_MANUAL_TICKET],
        mutationFn: createManualTicket,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });
}