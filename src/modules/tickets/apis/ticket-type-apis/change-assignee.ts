import { useServiceClient } from "lib";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TicketsEndPoint, TicketsQueryKey } from "../api-enums";
import { useGetQueryEndPoint } from "modules/tickets/containers";

export interface IChangeAsigneeArgs {
    queueId: string;
    agent?: string;
}

export const useChangeAsignee = (ticketId: string) => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();
    const queryKey = useGetQueryEndPoint();

    const changeAsignee = useCallback((args: IChangeAsigneeArgs) => {
        const agentValue = args?.agent ? `&employee_id=${args.agent}` : '';
        return postData(`${TicketsEndPoint.CHANGE_ASSIGNEE}?ticket_id=${ticketId}&queue_id=${args.queueId}${agentValue}`).then((res) => res.json());
    }, [postData, ticketId]);

    return useMutation({
        mutationKey: [TicketsQueryKey.CHANGE_ASSIGNEE],
        mutationFn: changeAsignee,
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey);
        }
    });
}