import { useServiceClient } from "lib";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from "./api-enums";
import { ICreateAutoAssignmentArgs } from "./create-auto-assignment";

export const useEditAutoAssignment = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editAutoAssignment = React.useCallback((args: ICreateAutoAssignmentArgs & { id: string }) => postData(AutoAssignmentEndPoint.EDIT_ASSIGNMENT, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AutoAssignmentQueryKey.EDIT_ASSIGNMENT,
        mutationFn: editAutoAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries(AutoAssignmentQueryKey.FETCH_ALL_ASSIGNMENTS);
        }
    });
}