import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface ISLAValues {
    sla_applied_tickets: SlaAppliedTickets;
    sla_breaches: SlaBreaches;
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

export const useFetchSLAValues = () => {
    const { getData } = useServiceClient();

    const fetchAllSLAValues = React.useCallback(() => getData(`${DashboardEndPoint.FETCH_SLA_VALUES}`).then((res) => res.json()), [getData])

    return useQuery<ISLAValues, { message: string }>({
        queryKey: [DashboardQueryKeys.FETCH_DASHBOARD_DATA],
        queryFn: fetchAllSLAValues
    });
}