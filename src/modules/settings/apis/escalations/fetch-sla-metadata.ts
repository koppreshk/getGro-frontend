import React from "react";
import { useServiceClient } from "lib";
import { EscalationEndPoint, EscalationQueryKey } from "./api-enums";
import { useQuery } from "react-query";

interface TicketField {
    Source: number;
    Priority: number;
    Queue: number;
    Status: number;
}

interface RunTypes {
    Minutes: number;
    Hours: number;
    Days: number;
}

interface Priority {
    id: number;
    name: string;
}

interface ReminderTime {
    [key: string]: number;
}

interface EscalationType {
    [key: string]: number;
}

interface Queue {
    id: number;
    name: string;
    uniqueKey: string;
}

interface User {
    firstName: string;
    lastName: string;
    id: number;
}

export interface ISLAmetaData {
    ticket_fields: TicketField;
    run_types: RunTypes;
    priorities: Priority[];
    reminder_times: ReminderTime;
    escalation_types: EscalationType;
    queue_list: Queue[];
    user_list: User[];
}

export const data: ISLAmetaData = {
    ticket_fields: {
        Source: 0,
        Priority: 1,
        Queue: 2,
        Status: 3
    },
    run_types: {
        Minutes: 0,
        Hours: 1,
        Days: 2
    },
    priorities: [
        { id: 1, name: "Low" },
        { id: 2, name: "Normal" },
        { id: 3, name: "High" },
        { id: 4, name: "Critical" }
    ],
    reminder_times: {
        "Before 15 Minutes": 0,
        "Before 30 Minutes": 1,
        "Before 1 Hour": 2
    },
    escalation_types: {
        "Immediately": 0,
        "After 30 Minutes": 1,
        "After 1 Hour": 2
    },
    queue_list: [
        { id: 1, name: "Email", uniqueKey: "E1" },
        { id: 2, name: "Whatsapp", uniqueKey: "WA1" },
        { id: 3, name: "IVR", uniqueKey: "IVR1" }
    ],
    user_list: [
        { firstName: "admin", lastName: "intent.co", id: 7 },
        { firstName: "ivr2", lastName: "intent.co", id: 6 },
        { firstName: "ivr1", lastName: "intent.co", id: 5 },
        { firstName: "whatsapp2", lastName: "intent.co", id: 4 },
        { firstName: "whatsapp1", lastName: "intent.co", id: 3 },
        { firstName: "email2", lastName: "intent.co", id: 2 },
        { firstName: "email1", lastName: "intent.co", id: 1 }
    ]
};

export const useFetchSLAmetaData = () => {
    const { getData } = useServiceClient();

    const getSLAmetadata = React.useCallback(() => getData(EscalationEndPoint.FETCH_SLA_METADATA).then(res => res.json()), [getData]);

    return useQuery<ISLAmetaData>({
        queryKey: EscalationQueryKey.FETCH_SLA_METADATA,
        queryFn: getSLAmetadata
    });
}