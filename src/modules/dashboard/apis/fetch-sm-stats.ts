import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export interface SupportMonitoringStatistics {
    tickets_created: number;
    tickets_closed: number;
    replies_by_agents: number;
    replies_by_customers: number;
    response_pending: number;
    resolution_pending: number;
}

export const useFetchSupportMonitoringStatistics = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SM_TICKET_STATISTICS}?from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, parsedFromDate, parsedToDate])

    return useQuery<SupportMonitoringStatistics, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_SM_TICKET_STATISTICS, dateRange],
        queryFn: fetchSupportMonitoringData
    });
}