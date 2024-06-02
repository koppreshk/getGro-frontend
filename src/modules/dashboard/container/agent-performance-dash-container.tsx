import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAgentPerformanceData } from "../apis";
import { AgentPerformance } from "../components/parts/agent-performnace/agent-performance"
import React from "react";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export const AgentPerformanceDashContainer = () => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: new Date(), endDate: new Date() });

    const { data, isLoading } = useFetchAgentPerformanceData(dateRange);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AgentPerformance data={data} setDateRange={setDateRange} dateRange={dateRange} />
        )
    }

    return <span>Error</span>
}