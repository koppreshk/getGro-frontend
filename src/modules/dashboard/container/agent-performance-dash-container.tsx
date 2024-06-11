import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchDropdownValues } from "../apis";
import { AgentPerformance, IAgentPerformanceFormFields } from "../components/parts/agent-performnace/agent-performance"
import { useForm, FormProvider } from "react-hook-form";

export const AgentPerformanceDashContainer = () => {
    const { data, isLoading } = useFetchDropdownValues();

    const form = useForm<IAgentPerformanceFormFields>({
        values: {
            filterType: 'queue',
            filterValue: data?.queues[0].id.toString() || ''
        }
    });

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <FormProvider {...form}>
            <AgentPerformance data={data!} />
        </FormProvider>
    )
}