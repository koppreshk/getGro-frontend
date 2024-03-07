import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";

export interface IEscalations {
    escalation_conditions: EscalationConditions[]
    total_pages: number
}

export interface EscalationConditions {
    id: number
    name: string
    after: string
    condition: string
    alert_time: number
    status: string;
    sub_status: string;
    last_conversation_type: string | null
    queue_list_id: string | null
    customer_classification: string | null
    designation_type: string | null
    type_of_ticket: string | null;
}

export const useFetchAllEscalations = () => {
    const { getData } = useServiceClient();

    const fetchAllEscalations = React.useCallback(() => getData(`${EscalationEndPoint.FETCH_ALL_ESCALATIONS}`).then((res) => res.json()), [getData])

    return useQuery<IEscalations, { message: string }>({
        queryKey: EscalationQueryKey.FETCH_ALL_ESCALATIONS,
        queryFn: fetchAllEscalations
    });
}