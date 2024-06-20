import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { EscalationQueryKey, EscalationEndPoint } from "./api-enums";

export const useDeleteEscalation = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const deleteEscalation = React.useCallback((args: { id: number }) =>
        postData(`${EscalationEndPoint.DELETE_ESCALATION_NEW}?id=${args.id}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.DELETE_ESCALATION_NEW,
        mutationFn: deleteEscalation,
        onSuccess: () => {
            queryClient.invalidateQueries(EscalationQueryKey.FETCH_ALL_ESCALATIONS_NEW);
        }
    });
}