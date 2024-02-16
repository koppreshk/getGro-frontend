import { useServiceClient } from "lib"
import React from "react";
import { EscalationQueryKey, EscalationEndPoint } from "./api-enums";
import { useMutation, useQueryClient } from "react-query";
import { EscalationConditionsArgs } from "./edit-escalation";

export const useCreateEscalations = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const createEscalation = React.useCallback((args: Omit<EscalationConditionsArgs, 'id'>) =>
        postData(`${EscalationEndPoint.CREATE_ESCALATION}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.CREATE_ESCALATION,
        mutationFn: createEscalation,
        onSuccess: () => {
            queryClient.invalidateQueries(EscalationQueryKey.FETCH_ALL_ESCALATIONS);
        }
    });
}