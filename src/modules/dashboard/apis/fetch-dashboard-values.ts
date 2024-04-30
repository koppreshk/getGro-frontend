import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface IDashboardData {
    total_tickets: number
    pending_tickets: number
    completed_tickets: number
    first_contact_resolutions: number
    reopened_tickets: number
    channels_info: ChannelsInfo
    total_completed_by_users: TotalCompletedByUsers
}

export interface ChannelsInfo {
    Instagram: number
    Email: number
    Facebook: number
}

export interface TotalCompletedByUsers {
    [key: string]: number
}

export const useFetchDashboardData = () => {
    const { getData } = useServiceClient();

    const fetchAllDashboardData = React.useCallback(() => getData(`dashboard/${DashboardEndPoint.FETCH_DASHBOARD_DATA}`).then((res) => res.json()), [getData])

    return useQuery<IDashboardData>({
        queryKey: DashboardQueryKeys.FETCH_DASHBOARD_DATA,
        queryFn: fetchAllDashboardData
    });
}