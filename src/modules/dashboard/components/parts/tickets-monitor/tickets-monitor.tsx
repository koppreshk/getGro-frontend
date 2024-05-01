import { FlexBox, GridLayout } from "lib/ui-ux"
import { DashboardDateRangePicker } from "../dashboard-date-range-picker"
import { IncomingTickets } from "./incoming-tickets"
import { TicketsBySource } from "./tickets-by-source"
import { ToDoList } from "./to-do-list"
import { TopFiveMetrics } from "./top-five-metrics"
import { TotalDisposed } from "./total-disposed"
import { Trends } from "./trends"
import { IDashboardData } from "modules/dashboard/apis"

interface ITicketMonitorProps {
    data: IDashboardData
}

export const TicketMonitor = (props: ITicketMonitorProps) => {
    const { data } = props;
    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="0px 25px">
                <FlexBox justifyContent="flex-end" alignItems="center">
                    <DashboardDateRangePicker />
                </FlexBox>
                <TopFiveMetrics
                    total_tickets={data.total_tickets}
                    reopened_tickets={data.reopened_tickets}
                    pending_tickets={data.pending_tickets}
                    completed_tickets={data.completed_tickets}
                    first_contact_resolutions={data.first_contact_resolutions} />
                <GridLayout $gridGap="20px" $gridTemplateColumns={'3.13fr 1fr'}>
                    <Trends />
                    <ToDoList />
                </GridLayout>
                <GridLayout $gridGap="20px" $gridTemplateColumns={'1fr 1fr 1fr'}>
                    <TotalDisposed />
                    <TicketsBySource channelsInfo={data.channels_info} />
                    <IncomingTickets />
                </GridLayout>
            </FlexBox>
        </>
    )
}