import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { AgentsQueryKey, AgentsEndPoint } from "./api-enums";

type DeactiveUserArgs = {
    id: string | number
    deactivation_type?: 'remove_assignee_and_groups' | 'deactivate_and_reassign_tickets' | 'remove_assignee_only',
    reassign_to?: string | number;
    queue_id?: string | number;
}

export const useDeactivateUser = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deactivateUser = React.useCallback((args: DeactiveUserArgs) => postData(AgentsEndPoint.DEACTIVATE_USER, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AgentsQueryKey.DEACTIVATE_USER,
        mutationFn: deactivateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_USERS);
        }
    });
}