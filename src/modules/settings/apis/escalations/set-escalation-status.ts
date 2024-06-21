import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { EscalationQueryKey, EscalationEndPoint } from "./api-enums";

export const useSetEscalationStatus = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const setEscalationStatus = React.useCallback((args: { id: number }) =>
        postData(`${EscalationEndPoint.SET_ESCALATION_STATUS}?id=${args.id}`).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.SET_ESCALATION_STATUS,
        mutationFn: setEscalationStatus,
        onSuccess: () => {
            queryClient.invalidateQueries(EscalationQueryKey.FETCH_ALL_ESCALATIONS_NEW);
        }
    });
}