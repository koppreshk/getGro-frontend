import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";
import { EscalationConditions } from "./fetch-all-escalations";

export type EscalationConditionsArgs = Omit<EscalationConditions, 'status' | 'sub_status' | 'queue_list_id' | 'escalate_to' | 'disposition_type' | 'priority'> & {
    status_id: number | null;
    sub_status_id: number | null;
    escalate_to: number | null;
    priorities: number | null;
    dispostion_type: number | null;
    queue_list_id: number | null;
}

export const useEditEscalation = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editEscalation = React.useCallback((args: EscalationConditionsArgs) =>
        postData(`${EscalationEndPoint.EDIT_ESCALATION}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.EDIT_ESCALATION,
        mutationFn: editEscalation,
        onSuccess: () => {
            queryClient.invalidateQueries(EscalationQueryKey.FETCH_ALL_ESCALATIONS);
        }
    });
}