import React from "react";
import { useQuery } from "react-query";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { useServiceClient } from "lib";
import { DashboardEndPoint, DashboardQueryKeys } from "./api-enums";

export interface SlaComparisondata {
    PriorityTypes: PriorityTypes;
    High: PriorityTypes;
    Critical: PriorityTypes;
    Normal: PriorityTypes;
}
interface PriorityTypes {
    achieved_count: number;
    breach_count: number;
    total_tickets: number;
}

export const useFetchSLAComparisionValues = (dateRange: DateRange) => {
    const { getData } = useServiceClient();
    const parsedFromDate = dateRange.startDate!.toISOString();
    const parsedToDate = dateRange.endDate!.toISOString();

    const fetchAllSLAComparisionValues = React.useCallback(() => getData(`${DashboardEndPoint.SLA_COMPARISION}?from=${parsedFromDate}&to=${parsedToDate}`).then((res) => res.json()), [getData, parsedFromDate, parsedToDate])

    return useQuery<SlaComparisondata, { message: string }>({
        queryKey: [DashboardQueryKeys.SLA_COMPARISION, dateRange],
        queryFn: fetchAllSLAComparisionValues
    });
}