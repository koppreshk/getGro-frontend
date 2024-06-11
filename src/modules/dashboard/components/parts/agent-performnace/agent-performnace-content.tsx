import { GridLayout } from "lib/ui-ux"
import { AgentTicketStats } from "./agent-ticket-stats"
import { CustomerSatifaction, TotalLoginHours } from "./customer-satifaction"
import { IAgentPerformance } from "modules/dashboard/apis"

export const AgentPerformanceContent = (props: { data: IAgentPerformance }) => {
    return (
        <>
            <AgentTicketStats data={props.data} />
            <GridLayout $gridTemplateColumns={'2fr 1fr'} $gridGap={'20px'}>
                <CustomerSatifaction />
                <TotalLoginHours />
            </GridLayout>
        </>
    )
}