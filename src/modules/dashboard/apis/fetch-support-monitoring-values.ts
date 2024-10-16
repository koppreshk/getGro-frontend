import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export interface SupportMonitoringValues {
    total_tickets: number;
    pending_tickets: number;
    response_overdue: number;
    resolution_overdue: number;
    email: number;
    ivr: number;
    whatsapp: number;
}

export const useFetchSupportMonitoringValues = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.SUPPORT_MONITORING}?from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, parsedFromDate, parsedToDate])

    return useQuery<SupportMonitoringValues, { message: string }>({
        queryKey: [DashboardQueryKeys.SUPPORT_MONITORING, dateRange],
        queryFn: fetchSupportMonitoringData
    });
}