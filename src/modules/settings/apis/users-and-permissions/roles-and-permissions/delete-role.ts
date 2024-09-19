import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { RolesEndPoint, RolesQueryKey } from "./api-enums";
import { AgentsQueryKey } from "../agents/api-enums";

export interface IDeleteRoleArgs {
    role_id: number | string
    new_role_id: number | string
}

export const useDeleteRole = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const onDeleteRole = React.useCallback((args: IDeleteRoleArgs) => postData(RolesEndPoint.DELETE_ROLE, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: RolesQueryKey.DELETE_ROLE,
        mutationFn: onDeleteRole,
        onSuccess: () => {
            queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_ROLES);
        }
    });
}