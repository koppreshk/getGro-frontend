import { SupportMonitoring } from "../components/parts/support-monitoring/support-monitoring"

export const SupportMonitoringDashContainer = () => {
    const data = {
        pending_tickets: 12,
        hold_tickets: 3,
        response_overdue: 54,
        resolution_overdue: 23,
        channels_info: {
            Instagram: 8,
            Email: 12,
            Facebook: 6
        }
    }
    return (
        <>
            <SupportMonitoring data={data} />
        </>
    )
}