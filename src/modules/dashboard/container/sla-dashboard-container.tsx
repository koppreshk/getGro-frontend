import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchSLAValues } from "../apis";
import { SLADashboard } from "../components/parts/sla-dashboard"

export const SLADashboardContainer = () => {
    const breachedData = {
        BreachedTicketsCountPercentage: 83.3,
        ResponseBreachedCountPercentage: 80.0,
        ResolutionBreachedCountPercentage: 20.0
    }

    const { data, isLoading, error } = useFetchSLAValues();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <SLADashboard breachedData={breachedData} data={data} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}