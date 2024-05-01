import { CenteredCircularProgress } from "lib/ui-ux"
import { useFetchDashboardData } from "../apis"
import { TicketMonitor } from "../components/parts/tickets-monitor/tickets-monitor";

export const TicketMonitoringDashContainer = () => {
    const { data, isLoading } = useFetchDashboardData();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <TicketMonitor data={data} />
        )
    }

    return <span>Error</span>
}

