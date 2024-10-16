import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export interface SupportMonitoringTicketsCreated {
    [key: string]: number;
}

export const useFetchSupportMonitoringTicketsCreated = (groupBy: string, dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SM_TICKETS_CREATED}?group_by=${groupBy}&from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, groupBy, parsedFromDate, parsedToDate])

    return useQuery<SupportMonitoringTicketsCreated, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_SM_TICKETS_CREATED, groupBy, dateRange],
        queryFn: fetchSupportMonitoringData
    });
}