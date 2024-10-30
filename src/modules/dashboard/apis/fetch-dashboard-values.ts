import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export interface IDashboardData {
    total_tickets: number
    pending_tickets: number
    completed_tickets: number
    first_contact_resolutions: number
    reopened_tickets: number
    channels_info: {
        [key: string]: number;
    }
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

export const useFetchDashboardData = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

    const fetchAllDashboardData = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_DASHBOARD_DATA}?from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, parsedFromDate, parsedToDate])

    return useQuery<IDashboardData>({
        queryKey: [DashboardQueryKeys.FETCH_DASHBOARD_DATA, dateRange],
        queryFn: fetchAllDashboardData
    });
}