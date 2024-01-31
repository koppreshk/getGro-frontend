import { useServiceClient } from "lib"
import React from "react";
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { useMutation, useQueryClient } from "react-query";

interface IAssignedEmployees {
    firstName: string;
    lastName: string | null;
    id: number;
}

export interface ICreateTicketQueueArgs {
    queueName: string;
    queueKey: string;
    autoAssignType: string;
    queueType: string;
    assigned_employees: IAssignedEmployees[]
}

export const useCreateTicketQueues = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const createTicketQueue = React.useCallback((args: ICreateTicketQueueArgs) =>
        postData(`${ConfigurationsEndPoint.CREATE_TICKET_QUEUE}`, {
            name: args.queueName,
            unique_key: args.queueKey,
            auto_assign_type: args.autoAssignType,
            queue_type: args.queueType,
            assigned_employees: args.assigned_employees
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: ConfigurationsQueryKey.CREATE_TICKET_QUEUE,
        mutationFn: createTicketQueue,
        onSuccess: () => {
            queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_ALL_TICKETS_QUEUE);
        }
    });
}