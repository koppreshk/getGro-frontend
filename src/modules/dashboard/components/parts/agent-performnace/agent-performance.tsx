import { FlexBox } from "lib/ui-ux";
import { AgentTicketStats } from "./agent-ticket-stats";

interface IAgentPerformanceProps {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AgentPerformance = (_props: IAgentPerformanceProps) => {
    return (
        <>
            <FlexBox flexDirection="column" gap="15px" height="100%" padding="20px">
                <AgentTicketStats />
            </FlexBox>
        </>
    )
}