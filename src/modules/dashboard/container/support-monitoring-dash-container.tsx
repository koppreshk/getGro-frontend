import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchSupportMonitoringValues } from "../apis";
import { SupportMonitoring } from "../components/parts/support-monitoring/support-monitoring"

export const SupportMonitoringDashContainer = () => {
    const { data, isLoading, error, isRefetching } = useFetchSupportMonitoringValues();

    if (isLoading || isRefetching) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <SupportMonitoring data={data} />
            </>
        )
    }

    return (
        <ErrorMessage statusCode={error?.message} />
    )
}