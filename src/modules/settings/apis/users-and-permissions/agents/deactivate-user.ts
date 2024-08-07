import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { AgentsQueryKey, AgentsEndPoint } from "./api-enums";

export const useDeactivateUser = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deactivateUser = React.useCallback((args: { id: string | number }) => postData(AgentsEndPoint.DEACTIVATE_USER, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AgentsQueryKey.DEACTIVATE_USER,
        mutationFn: deactivateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_ROLES);
        }
    });
}