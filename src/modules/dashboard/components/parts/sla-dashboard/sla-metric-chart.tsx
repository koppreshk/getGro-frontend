import { SlaComparisondata } from "modules/dashboard/apis";
import { SlaBreachedOnTimeChart } from "./sla-breached-on-time-chart"
import { SlaMetricFilter } from "./sla-metric-filter"

export interface ISLAmetricsChartProps {
    groupByPriorityData: SlaComparisondata;
}

export const SLAmetricsChart = (props: ISLAmetricsChartProps) => {
    const { groupByPriorityData } = props;
    return (
        <>
            <SlaMetricFilter />
            <SlaBreachedOnTimeChart groupByPriorityData={groupByPriorityData}/>
            {/* <SLAachivedVsBreachedTickets /> */}
        </>
    )
}