import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useGetQueryEndPoint } from "modules/tickets/containers";

export interface IChangePriorityArgs {
    priorityId: string | number;
}

export const useChangePriority = (ticketId: string) => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    const queryKey = useGetQueryEndPoint();

    const changePriority = useCallback((args: IChangePriorityArgs) => {
        return postData(`${TicketsEndPoint.UPDATE_PRIORITY}`, {
            ticket_id: ticketId,
            priority_id: args.priorityId
        }).then((res) => res.json());
    }, [postData, ticketId]);

    return useMutation({
        mutationKey: [TicketsQueryKey.UPDATE_PRIORITY],
        mutationFn: changePriority,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });
}