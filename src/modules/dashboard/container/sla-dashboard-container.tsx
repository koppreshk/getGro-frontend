import { SLADashboard } from "../components/parts/sla-dashboard"

export const SLADashboardContainer = () => {
    const breachedData = {
        TicketsCount: 6,
        AchievedTicketsCount: 1,
        BreachedTicketsCount: 5,
        BreachesCount: 5,
        ResponseBreachedCount: 4,
        ResolutionBreachedCount: 1,
        AchievedTicketsCountPercentage: 16.7,
        BreachedTicketsCountPercentage: 83.3,
        ResponseBreachedCountPercentage: 80.0,
        ResolutionBreachedCountPercentage: 20.0
    }
    return (
        <SLADashboard breachedData={breachedData} />
    )
}