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
    data: Data
    type: string
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

    return useQuery<IAgentPerformance>({
        queryKey: [DashboardQueryKeys.AGENT_PERFORMANCE, filterType, filterValue, parsedFromDate, parsedToDate],
        queryFn: fetchAllAgentPerformanceData
    });
}

export const useFetchAgentPerformanceDataInitial = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();
    const fetchAllAgentPerformanceData = React.useCallback(() => getData(`${DashboardEndPoint.AGENT_PERFORMANCE}?from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, parsedFromDate, parsedToDate])

    return useQuery<IAgentPerformance>({
        queryKey: [DashboardQueryKeys.AGENT_PERFORMANCE + 'initial'],
        queryFn: fetchAllAgentPerformanceData
    });
}