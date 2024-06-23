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
    evaluation_type: string | number
    ticket_fields: TicketField[]
    targets: Target[]
    reminder: Reminder
    escalations: Escalations
}

interface TicketField {
    id: string
    value: string
}

interface Target {
    priority_id: number
    time_to_first_response: string
    time_to_next_response: string
    time_to_resolution: string
    first_response_run_type_id: string
    next_response_run_type_id: string
    resolution_run_type_id: string
}

interface Reminder {
    fr_reminder_id: string
    nr_reminder_id: string
    rs_reminder_id: string
    fr_queue_ids: string[],
    fr_user_ids: string[],
    nr_queue_ids: string[],
    nr_user_ids: string[],
    rs_queue_ids: string[],
    rs_user_ids: string[]
}

interface Escalations {
    fr_escalation_id: string
    nr_escalation_id: string
    rs_escalation_id: string
    fr_queue_ids: string[],
    fr_user_ids: string[],
    nr_queue_ids: string[],
    nr_user_ids: string[],
    rs_queue_ids: string[],
    rs_user_ids: string[]
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