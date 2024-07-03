import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export interface ISLAValues {
    sla_applied_tickets: SlaAppliedTickets;
    sla_breaches: SlaBreaches;
    sla_comparison_data: SlaComparisondata;
}

interface SlaBreaches {
    unique_ticket_count: number;
    response_breach_percentage: number;
    response_breached_count: number;
    resolution_breach_percentage: number;
    resolution_breached_count: number;
    total_breaches: number;
}
interface SlaAppliedTickets {
    unique_ticket_count: number;
    sla_breach_percentage: number;
    sla_breached_count: number;
    sla_achieved_count: number;
    sla_achieved_percentage: number;
}

export interface SlaComparisondata {
    Low: Low;
    High: Low;
    Critical: Low;
}
interface Low {
    achieved_count: number;
    breach_count: number;
    total_tickets: number;
}

export const useFetchSLAValues = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

    const fetchAllSLAValues = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SLA_VALUES}?from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, parsedFromDate, parsedToDate])

    return useQuery<ISLAValues, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_DASHBOARD_DATA, dateRange],
        queryFn: fetchAllSLAValues
    });
}