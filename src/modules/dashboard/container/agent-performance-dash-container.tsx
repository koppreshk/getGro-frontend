import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchDropdownValues } from "../apis";
import { AgentPerformance } from "../components/parts/agent-performnace/agent-performance"

export const AgentPerformanceDashContainer = () => {
    const { data, isLoading, error } = useFetchDropdownValues();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AgentPerformance data={data!} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}