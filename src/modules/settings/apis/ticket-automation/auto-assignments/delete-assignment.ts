import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from "./api-enums";

export const useDeleteAssignment = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteAssignment = React.useCallback((args: { id: number }) =>
        postData(`${AutoAssignmentEndPoint.DELETE_ASSIGNMENT}?id=${args.id}&automation_type=auto_assignment`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AutoAssignmentQueryKey.DELETE_ASSIGNMENT,
        mutationFn: deleteAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries(AutoAssignmentQueryKey.FETCH_ALL_ASSIGNMENTS);
        }
    });
}