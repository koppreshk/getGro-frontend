import { useServiceClient } from "lib";
import React from "react";
import { useQuery } from "react-query";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface SupportMonitoringValues {
    total_tickets: number;
    pending_tickets: number;
    response_overdue: number;
    resolution_overdue: number;
    email: number;
    ivr: number;
    whatsapp: number;
}

export const useFetchSupportMonitoringValues = () => {
    const { getData } = useServiceClient();
    const fetchSupportMonitoringData = React.useCallback(() => getData(`${DashboardEndPoint.SUPPORT_MONITORING}`).then((res) => res.json()), [getData])

    return useQuery<SupportMonitoringValues, { message: string }>({
        queryKey: [DashboardQueryKeys.SUPPORT_MONITORING],
        queryFn: fetchSupportMonitoringData
    });
}