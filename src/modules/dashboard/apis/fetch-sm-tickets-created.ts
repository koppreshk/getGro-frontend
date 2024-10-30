import { useServiceClient } from "lib";
import React from "react";
import { DateTime } from "luxon";
import { useQuery } from "react-query";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface SupportMonitoringTicketsCreated {
    [key: string]: number;
}

export const useFetchSupportMonitoringTicketsCreated = (groupBy: string, dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = DateTime.fromISO(dateRange.startDate!.toISOString()).toFormat('yyyy-MM-dd');
    const parsedToDate = DateTime.fromISO(dateRange.endDate!.toISOString()).toFormat('yyyy-MM-dd');

    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SM_TICKETS_CREATED}?group_by=${groupBy}&from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, groupBy, parsedFromDate, parsedToDate])

    return useQuery<SupportMonitoringTicketsCreated, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_SM_TICKETS_CREATED, groupBy, dateRange],
        queryFn: fetchSupportMonitoringData
    });
}