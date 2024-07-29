import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { UpdateTicketTriggersEndPoint, UpdateTicketTriggersQueryKey } from "./api-enums";

export const useDeleteAssignment = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteAssignment = React.useCallback((args: { id: number }) =>
        postData(`${UpdateTicketTriggersEndPoint.DELETE_ASSIGNMENT}?id=${args.id}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: UpdateTicketTriggersQueryKey.DELETE_ASSIGNMENT,
        mutationFn: deleteAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries(UpdateTicketTriggersQueryKey.FETCH_ALL_ASSIGNMENTS);
        }
    });
}