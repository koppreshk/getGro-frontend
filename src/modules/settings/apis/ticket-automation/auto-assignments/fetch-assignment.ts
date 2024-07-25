import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from "./api-enums";

export interface IAssignment {
    id: number
    name: string
    description: string
    rules: Rule[]
    associate_agent: AssociateAgent
    is_active: boolean
}

interface Rule {
    id: number
    ticket_field_id: number
    operator_id: number
    value: string
    rule_type: string
}

interface AssociateAgent {
    queue_id: number
    assignment_mode: string
}


export const useFetchAssignment = () => {
    const { getData } = useServiceClient();

    const fetchAssignment = React.useCallback(() => getData(AutoAssignmentEndPoint.FETCH_ASSIGNMENT).then((res) => res.json()), [getData]);

    return useQuery<IAssignment, { message: string }>({
        queryKey: AutoAssignmentQueryKey.FETCH_ASSIGNMENT,
        queryFn: fetchAssignment,
    })
}