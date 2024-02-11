import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";
import { EscalationConditions } from "./fetch-all-escalations";

export const useEditEscalation = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editEscalation = React.useCallback((args: Pick<EscalationConditions, 'id' | 'name'>) =>
        postData(`${EscalationEndPoint.EDIT_ESCALATION}`, {
            name: args.name,
            id: args.id,
        }).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.EDIT_ESCALATION,
        mutationFn: editEscalation,
        onSuccess: () => {
            queryClient.invalidateQueries(EscalationQueryKey.FETCH_ALL_ESCALATIONS);
        }
    });
}