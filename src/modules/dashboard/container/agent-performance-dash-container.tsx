import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchDropdownValues } from "../apis";
import { AgentPerformance, IAgentPerformanceFormFields } from "../components/parts/agent-performnace/agent-performance"
import { useForm, FormProvider } from "react-hook-form";

export const AgentPerformanceDashContainer = () => {
    const { data, isLoading, error } = useFetchDropdownValues();

    const form = useForm<IAgentPerformanceFormFields>({
        values: {
            filterType: 'queue',
            filterValue: data?.queues[0].id.toString() || ''
        }
    });

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <FormProvider {...form}>
                <AgentPerformance data={data!} />
            </FormProvider>
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}