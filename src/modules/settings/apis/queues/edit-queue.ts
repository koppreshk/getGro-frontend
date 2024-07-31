import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { ConfigurationsEndPoint, ConfigurationsQueryKey } from "./api-enums";
import { Queue } from "./fetch-all-queues";

export const useEditQueue = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editQueue = React.useCallback((args: Omit<Queue, 'uniqueKey'>) =>
        postData(`${ConfigurationsEndPoint.EDIT_QUEUE}`, {
            name: args.name,
            id: args.id,
            assigned_employees: args.assignedEmployees
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: ConfigurationsQueryKey.EDIT_QUEUE,
        mutationFn: editQueue,
        onSuccess: () => {
            queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_ALL_TICKETS_QUEUE);
        }
    });
}