import { useFetchSLAComparisionValues } from "modules/dashboard/apis";
import { SlaBreachedOnTimeChart } from "./sla-breached-on-time-chart"
import { SlaMetricFilter } from "./sla-metric-filter"
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { CenteredCircularProgress } from "lib/ui-ux";

export interface ISLAmetricsChartProps {
    dateRange: DateRange;
}

export const SLAmetricsChart = (props: ISLAmetricsChartProps) => {
    const { dateRange } = props;
    const { data, isLoading } = useFetchSLAComparisionValues(dateRange);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <SlaMetricFilter />
            <SlaBreachedOnTimeChart groupByPriorityData={data!} />
            {/* <SLAachivedVsBreachedTickets /> */}
        </>
    )
}