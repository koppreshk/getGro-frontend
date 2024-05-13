import { FlexBox } from "lib/ui-ux"
import { SLAmetricsChart, TicketsBreached } from ".";


export interface IBreachedMetrics {
    TicketsCount: number;
    AchievedTicketsCount: number;
    BreachedTicketsCount: number;
    BreachesCount: number;
    ResponseBreachedCount: number;
    ResolutionBreachedCount: number;
    AchievedTicketsCountPercentage: number;
    BreachedTicketsCountPercentage: number;
    ResponseBreachedCountPercentage: number;
    ResolutionBreachedCountPercentage: number;
}

interface ISLADashboardProps {
    breachedData: IBreachedMetrics
}

export const SLADashboard = (props: ISLADashboardProps) => {
    const { breachedData } = props;
    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="25px 25px">
                <TicketsBreached breachedData={breachedData} />
                <SLAmetricsChart />
            </FlexBox>
        </>
    )
}