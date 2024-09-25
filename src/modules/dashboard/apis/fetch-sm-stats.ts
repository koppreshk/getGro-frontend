import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface SupportMonitoringStatistics {
    tickets_created: number;
    tickets_closed: number;
    replies_by_agents: number;
    replies_by_customers: number;
    response_pending: number;
    resolution_pending: number;
}

export const useFetchSupportMonitoringStatistics = (date: string) => {
    const { getData } = useServiceClient();
    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SM_TICKET_STATISTICS}?date=${date}`).then((res) => res.json()), [date, getData])

    return useQuery<SupportMonitoringStatistics, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_SM_TICKET_STATISTICS, date],
        queryFn: fetchSupportMonitoringData
    });
}