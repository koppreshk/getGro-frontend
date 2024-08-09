import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { AgentsQueryKey, AgentsEndPoint } from "./api-enums";

export const useActivateUser = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const activateUser = React.useCallback((args: { id: string | number }) => postData(AgentsEndPoint.ACTIVATE_USER, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AgentsQueryKey.ACTIVATE_USER,
        mutationFn: activateUser,
        onSuccess: () => {
            queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_USERS);
        }
    });
}