import React from "react";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";
import { useQuery } from "react-query";


export interface IKeyValue {
    key: string;
    value: string;
}

export interface IField {
    id: number;
    name: string;
}

export interface IPriority {
    id: number;
    name: string;
}

export interface IReminderTime {
    id: number;
    name: string;
}

export interface IEscalationType {
    id: number;
    name: string;
}

export interface IQueue {
    id: number;
    name: string;
    uniqueKey: string;
}

export interface IUser {
    firstName: string;
    lastName: string;
    id: string;
}

export interface ISLAmetaData {
    ticket_fields: IField[];
    run_types: IField[];
    priorities: IPriority[];
    reminder_times: IReminderTime[];
    escalation_types: IEscalationType[];
    queue_list: IQueue[];
    user_list: IUser[];
}

export const useFetchSLAmetaData = () => {
    const { getData } = useServiceClient();

    const getSLAmetadata = React.useCallback(() => getData(EscalationEndPoint.FETCH_SLA_METADATA).then(res => res.json()), [getData]);

    return useQuery<ISLAmetaData, { message: string }>({
        queryKey: EscalationQueryKey.FETCH_SLA_METADATA,
        queryFn: getSLAmetadata
    });
}