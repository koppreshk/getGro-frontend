import { FlexBox, GridLayout } from "lib/ui-ux"
import { DashboardDateRangePicker } from "../dashboard-date-range-picker"
import { IncomingTickets } from "./incoming-tickets"
import { TicketsBySource } from "./tickets-by-source"
import { ToDoList } from "./to-do-list"
import { TopFiveMetrics } from "./top-five-metrics"
import { TotalDisposed } from "./total-disposed"
import { TicketsCreatedAndClosed } from "./tickets-created-closed"
import { IDashboardData } from "modules/dashboard/apis"
import { DateRange } from "@matharumanpreet00/react-daterange-picker"
import { QuickTrends } from "./quick-trends"

interface ITicketMonitorProps {
    data: IDashboardData;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
    dateRange: DateRange;
}

export const TicketMonitor = (props: ITicketMonitorProps) => {
    const { data, dateRange, setDateRange } = props;
    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="0px 25px">
                <FlexBox justifyContent="flex-end" alignItems="center">
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <TopFiveMetrics
                    total_tickets={data.total_tickets}
                    reopened_tickets={data.reopened_tickets}
                    pending_tickets={data.pending_tickets}
                    completed_tickets={data.completed_tickets}
                    first_contact_resolutions={data.first_contact_resolutions} />
                <GridLayout $gridGap="20px" $gridTemplateColumns={'2fr 0.5fr 0.5fr'}>
                    <TicketsCreatedAndClosed dateRange={dateRange} />
                    <QuickTrends />
                    <ToDoList />
                </GridLayout>
                <GridLayout $gridGap="20px" $gridTemplateColumns={'1fr 1fr 1fr'}>
                    <TotalDisposed totalCompletedByUsers={data.total_completed_by_users} />
                    <TicketsBySource channelsInfo={data.channels_info} />
                    <IncomingTickets />
                </GridLayout>
            </FlexBox>
        </>
    )
}