import { useServiceClient } from "lib";
import React from "react";
import { useMutation } from "react-query";
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from "./api-enums";

export interface ICreateAutoAssignmentArgs {
    name: string
    description: string
    rules: Rule[]
    associate_agent: AssociateAgent
}

export interface Rule {
    ticket_field_id: number | string
    operator_id: number | string
    value: string | string[];
    rule_type: string
}

export interface AssociateAgent {
    queue_id: number | string
    assignment_mode: string
}


export const useCreateAutoAssignment = () => {
    const { postData } = useServiceClient();

    const createAutoAssignment = React.useCallback((args: ICreateAutoAssignmentArgs) => postData(AutoAssignmentEndPoint.CREATE_ASSIGNMENT, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationKey: AutoAssignmentQueryKey.CREATE_ASSIGNMENT,
        mutationFn: createAutoAssignment
    });
}