import React from "react";
import { useServiceClient } from "lib"
import { useQuery } from "react-query";
import { UpdateTicketTriggersEndPoint, UpdateTicketTriggersQueryKey } from "./api-enums";
import { useSearchParams } from "react-router-dom";

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
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const fetchAssignment = React.useCallback(() => getData(`${UpdateTicketTriggersEndPoint.FETCH_ASSIGNMENT}?id=${id}`).then((res) => res.json()), [getData, id]);

    return useQuery<IAssignment, { message: string }>({
        queryKey: [UpdateTicketTriggersQueryKey.FETCH_ASSIGNMENT, id],
        queryFn: fetchAssignment,
    })
}