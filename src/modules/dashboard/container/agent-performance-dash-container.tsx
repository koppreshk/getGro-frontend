import React from "react";
import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAgentPerformanceData, useFetchAgentPerformanceDataInitial } from "../apis";
import { AgentPerformance, IAgentPerformanceFormFields } from "../components/parts/agent-performnace/agent-performance"
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { useForm, FormProvider } from "react-hook-form";

interface IAgentPerformanceDashContainerWrappedProps {
    dateRange: DateRange;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>

}

const AgentPerformanceDashContainerWrapped = (props: IAgentPerformanceDashContainerWrappedProps) => {
    const { data, isLoading, error } = useFetchAgentPerformanceData(props.dateRange);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (error) {
        return <span>Error</span>
    }
    return (
        <AgentPerformance data={data!} setDateRange={props.setDateRange} dateRange={props.dateRange} />
    )
}

export const AgentPerformanceDashContainer = () => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: new Date(), endDate: new Date() });

    const apiInfo = useFetchAgentPerformanceDataInitial(dateRange);

    const form = useForm<IAgentPerformanceFormFields>({
        values: {
            filterType: 'queue',
            filterValue: apiInfo.data?.queues[0].id.toString() || ''
        }
    });

    return (
        <>
            <FormProvider {...form}>
                <AgentPerformanceDashContainerWrapped dateRange={dateRange} setDateRange={setDateRange} />
            </FormProvider>

        </>
    )
}