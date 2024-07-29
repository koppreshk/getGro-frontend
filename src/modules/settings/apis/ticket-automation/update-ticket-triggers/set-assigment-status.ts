import React from "react";
import { useMutation } from "react-query";
import { useServiceClient } from "lib";
import { UpdateTicketTriggersQueryKey, UpdateTicketTriggersEndPoint } from "./api-enums";

export const useSetAssignmentStatus = () => {
    const { postData } = useServiceClient();

    const setAssignmentStatus = React.useCallback((args: { id: number }) =>
        postData(`${UpdateTicketTriggersEndPoint.TOGGLE_ASSIGNMENT}?id=${args.id}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: UpdateTicketTriggersQueryKey.TOGGLE_ASSIGNMENT,
        mutationFn: setAssignmentStatus,
    });
}