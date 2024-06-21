import React from "react";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";
import { useQuery } from "react-query";


export interface IKeyValue {
    key: string;
    value: string;
}

export interface Field {
    id: number;
    name: string;
}

export interface Priority {
    id: number;
    name: string;
}

export interface ReminderTime {
    id: number;
    name: string;
}

export interface EscalationType {
    id: number;
    name: string;
}

export interface Queue {
    id: number;
    name: string;
    uniqueKey: string;
}

export interface User {
    firstName: string;
    lastName: string;
    id: number;
}

export interface ISLAmetaData {
    ticket_fields: Field[];
    run_types: Field[];
    priorities: Priority[];
    reminder_times: ReminderTime[];
    escalation_types: EscalationType[];
    queue_list: Queue[];
    user_list: User[];
}

export const useFetchSLAmetaData = () => {
    const { getData } = useServiceClient();

    const getSLAmetadata = React.useCallback(() => getData(EscalationEndPoint.FETCH_SLA_METADATA).then(res => res.json()), [getData]);

    return useQuery<ISLAmetaData>({
        queryKey: EscalationQueryKey.FETCH_SLA_METADATA,
        queryFn: getSLAmetadata
    });
}