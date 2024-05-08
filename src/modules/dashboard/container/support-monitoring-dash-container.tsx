import { SupportMonitoring } from "../components/parts/support-monitoring/support-monitoring"

export const SupportMonitoringDashContainer = () => {
    const data = {
        pending_tickets: 12,
        hold_tickets: 3,
        response_overdue: 54,
        resolution_overdue: 23
    }
    return (
        <>
            <SupportMonitoring data={data} />
        </>
    )
}