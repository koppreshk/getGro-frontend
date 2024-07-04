import { useFetchSLAComparisionValues } from "modules/dashboard/apis";
import { SlaBreachedOnTimeChart } from "./sla-breached-on-time-chart"
import { SlaMetricFilter } from "./sla-metric-filter"
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useState, useCallback } from "react";

export interface ISLAmetricsChartProps {
    dateRange: DateRange;
}

export const SLAmetricsChart = (props: ISLAmetricsChartProps) => {
    const { dateRange } = props;
    const [filterValue, setFilters] = useState('All');

    const onFilterChangeHandler = useCallback((value: string) => {
        setFilters(value);
    }, []);

    return (
        <>
            <SlaMetricFilter filterValue={filterValue} onFilterChangeHandler={onFilterChangeHandler} />
            <div style={{minHeight: '450px'}}><SlaMetricContainer dateRange={dateRange} filterValue={filterValue} /></div>
        </>
    )
}

const SlaMetricContainer = (props: { dateRange: DateRange; filterValue: string }) => {
    const { dateRange, filterValue } = props;
    const { data, isLoading } = useFetchSLAComparisionValues(dateRange, filterValue);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <SlaBreachedOnTimeChart groupByPriorityData={data!.data} />
            {/* <SLAachivedVsBreachedTickets /> */}
        </>
    )
}