import React from "react";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { DateTime } from "luxon";
import { useFetchSLAValues } from "../apis";
import { SLADashboard } from "../components/parts/sla-dashboard"
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";

export const SLADashboardContainer = () => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: DateTime.now().minus({ month: 1 }).toJSDate(), endDate: new Date() });

    const { data, isLoading, isRefetching, error } = useFetchSLAValues(dateRange);

    if (isLoading || isRefetching) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <SLADashboard data={data} setDateRange={setDateRange} dateRange={dateRange} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}