import { FlexBox, GridLayout } from "lib/ui-ux"
import { DashboardDateRangePicker } from "../components/parts/dashboard-date-range-picker"
import { IncomingTickets } from "../components/parts/incoming-tickets"
import { TicketsBySource } from "../components/parts/tickets-by-source"
import { ToDoList } from "../components/parts/to-do-list"
import { TotalDisposed } from "../components/parts/total-disposed"
import { Trends } from "../components/parts/trends"
import { TopFiveMetrics } from "../components/parts/top-five-metrics"

export const TicketMonitoringDashContainer = () => {
    return (
        <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="25px">
            <FlexBox justifyContent="flex-end" alignItems="center">
                <DashboardDateRangePicker />
            </FlexBox>
            <TopFiveMetrics />
            <GridLayout $gridGap="20px" $gridTemplateColumns={'3.13fr 1fr'}>
                <Trends />
                <ToDoList />
            </GridLayout>
            <GridLayout $gridGap="20px" $gridTemplateColumns={'1fr 1fr 1fr'}>
                <TotalDisposed />
                <TicketsBySource />
                <IncomingTickets />
            </GridLayout>
        </FlexBox>
    )
}

