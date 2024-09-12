import React from "react";
import { useQuery } from "react-query";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { useServiceClient } from "lib";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";
import { useFormContext } from "react-hook-form";
import { IAgentPerformanceFormFields } from "../components/parts/agent-performnace/agent-performance";

export interface IAgentPerformance {
    queues: Queue[]
    employees: Employee[]
    data: Data;
    data_v1: Datav1;
    type: string
}

export interface Datav1 {
    first_response_achieved: number;
    next_response_achieved: number;
    resolution_achieved: number;
    first_response_str: string;
    next_response_str: string;
    resolution_str: string;
    first_response_breached: number;
    next_response_breached: number;
    resolution_breached: number;
    first_response_breach_str: string;
    next_response_breach_str: string;
    resolution_breach_str: string;
    average_first_response_time: number;
    average_next_response_time: string;
    average_resolution_time: number;
    tickets_created: number;
    tickets_assigned: number;
    total_assigned_average: number;
    tickets_resolved: number;
    tickets_closed: number;
    tickets_reopened: number;
    average_assigned_per_day: number;
    average_resolved_per_day: number;
    fcr: Fcr2;
}
interface Fcr2 {
    percentage?: null | number;
    count_str: string;
}
export interface Queue {
    id: number
    name: string
    uniqueKey: string
}

export interface Employee {
    firstName: string
    lastName?: string
    id: number
}

export interface Data {
    total_tickets: number
    tickets_created: number
    ticket_assigned: number
    total_assigned_average: number
    total_resolved: number
    total_closed: number
    tickets_reopened: number
    avg_first_response_time: number
    avg_response_time: number
    avg_resolution_time: number
    fcr: {
        percentage: number;
        count_str: string;
    };
    sla_breached: SlaBreached
}

export interface SlaBreached {
    first_response: FirstResponse
    second_response: SecondResponse
}

export interface FirstResponse {
    tickets_breached: number
    sla_achieve: number
}

export interface SecondResponse {
    tickets_breached: number
    sla_achieve: number
}

export const useFetchAgentPerformanceData = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();
    const { watch } = useFormContext<IAgentPerformanceFormFields>();
    const { filterType, filterValue } = watch();

    const finalParam = filterType === 'queue' && filterValue ? `queue_id=${filterValue}` : filterType === 'user' && filterValue ? `user_id=${filterValue}` : '';
    const fetchAllAgentPerformanceData = React.useCallback(() => getData(`${DashboardEndPoint.AGENT_PERFORMANCE}?from=${parsedFromDate}&to=${parsedToDate}&type=${filterType}&${finalParam}`).then((res) => res.json()), [filterType, finalParam, getData, parsedFromDate, parsedToDate])

    return useQuery<IAgentPerformance, { message: string }>({
        queryKey: [DashboardQueryKeys.AGENT_PERFORMANCE, filterType, filterValue, parsedFromDate, parsedToDate],
        queryFn: fetchAllAgentPerformanceData
    });
}

export const useFetchDropdownValues = () => {
    const { getData } = useServiceClient();
    const fetchAllAgentPerformanceData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_DROPDOWN_VALUES}`).then((res) => res.json()), [getData])

    return useQuery<IAgentPerformance>({
        queryKey: [DashboardQueryKeys.FETCH_DROPDOWN_VALUES],
        queryFn: fetchAllAgentPerformanceData
    });
}