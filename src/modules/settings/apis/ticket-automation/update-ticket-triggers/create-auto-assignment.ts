import { useServiceClient } from "lib";
import React from "react";
import { useMutation } from "react-query";
import { UpdateTicketTriggersEndPoint, UpdateTicketTriggersQueryKey } from "./api-enums";

export interface ICreateUpdateTicketTriggersArgs {
    name: string
    description: string
    rules: Rule[]
    associate_agent: AssociateAgent
}

export interface Rule {
    ticket_field_id: number | string
    operator_id: number | string
    value: string;
    rule_type: string
}

export interface AssociateAgent {
    queue_id: number | string
    assignment_mode: string
}


export const useCreateTicketTriggers = () => {
    const { postData } = useServiceClient();

    const createUpdateTicketTriggers = React.useCallback((args: ICreateUpdateTicketTriggersArgs) => postData(UpdateTicketTriggersEndPoint.CREATE_ASSIGNMENT, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: UpdateTicketTriggersQueryKey.CREATE_ASSIGNMENT,
        mutationFn: createUpdateTicketTriggers
    });
}