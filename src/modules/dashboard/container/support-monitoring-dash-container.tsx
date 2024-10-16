import React from "react";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { DateTime } from "luxon";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchSupportMonitoringValues } from "../apis";
import { SupportMonitoring } from "../components/parts/support-monitoring/support-monitoring"

export const SupportMonitoringDashContainer = () => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: DateTime.now().minus({ month: 1 }).toJSDate(), endDate: new Date() });

    const { data, isLoading, error, isRefetching } = useFetchSupportMonitoringValues(dateRange);

    if (isLoading || isRefetching) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <SupportMonitoring data={data} setDateRange={setDateRange} dateRange={dateRange} />
            </>
        )
    }

    return (
        <ErrorMessage statusCode={error?.message} />
    )
}