import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { AgentPerformanceContent } from "../components/parts/agent-performnace/agent-performnace-content";
import { useFetchAgentPerformanceData } from "../apis";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";

export const AgentPerformancecontentContainer = (props: { dateRange: DateRange }) => {
    const { data, isLoading, error } = useFetchAgentPerformanceData(props.dateRange);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AgentPerformanceContent data={data!} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}