import { SLAachivedVsBreachedTickets, SlaBreachedOnTimeChart, SlaMetricFilter } from "."


export const SLAmetricsChart = () => {
    return (
        <>
            <SlaMetricFilter />
            <SlaBreachedOnTimeChart />
            <SLAachivedVsBreachedTickets />
        </>
    )
}