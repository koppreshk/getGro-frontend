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
//Payload

export interface ICreateEscalationPayload {
    name: string
    description: string
    evaluation_type: number
    ticket_fields: TicketField[]
    targets: Target[]
    reminder: Reminder
    escalations: Escalations
}

export interface TicketField {
    field: number
    value: number
}

export interface Target {
    priority_id: number
    time_to_first_response: number
    time_to_next_response: number
    time_to_resolution: number
    first_response_run_type: number
    next_response_run_type: number
    resolution_run_type: number
}

export interface Reminder {
    fr_reminder_in: number
    nr_reminder_in: number
    rs_reminder_in: number
    queue_ids: number[]
    user_ids: number[]
}

export interface Escalations {
    fr_escalation_type: number
    nr_escalation_type: number
    rs_escalation_type: number
    queue_ids: number[]
    user_ids: number[]
}

export const useCreateEscalationNew = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const createEscalation = React.useCallback((args: ICreateEscalationPayload) =>
        postData(`${EscalationEndPoint.CREATE_ESCALATION_NEW}`, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: EscalationQueryKey.CREATE_ESCALATION_NEW,
        mutationFn: createEscalation,
        onSuccess: () => {
            queryClient.invalidateQueries(EscalationQueryKey.FETCH_ALL_ESCALATIONS_NEW);
        }
    });
} 