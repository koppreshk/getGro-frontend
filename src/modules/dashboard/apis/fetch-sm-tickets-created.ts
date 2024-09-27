import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface SupportMonitoringTicketsCreated {
    [key: string]: number;
}

export const useFetchSupportMonitoringTicketsCreated = (groupBy: string, date: string) => {
    const { getData } = useServiceClient();
    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SM_TICKETS_CREATED}?group_by=${groupBy}&date=${date}`).then((res) => res.json()), [date, getData, groupBy])

    return useQuery<SupportMonitoringTicketsCreated, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_SM_TICKETS_CREATED, groupBy, date],
        queryFn: fetchSupportMonitoringData
    });
}