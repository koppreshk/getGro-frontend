import { FlexBox } from "lib/ui-ux"
import { TopFourMetrics } from "./top-four-metrics";
import { TicketStats } from "./ticket-stats";
import { TicketsDisposed } from "./tickets-disposed";

export interface ISupportMonitor {
    pending_tickets: number;
    hold_tickets: number;
    response_overdue: number;
    resolution_overdue: number;
}

interface ISupportMonitoringProps {
    data: ISupportMonitor;
}

export const SupportMonitoring = (props: ISupportMonitoringProps) => {
    const { hold_tickets, pending_tickets, resolution_overdue, response_overdue } = props.data;

    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="0px 25px">
                <TopFourMetrics
                    resolution_overdue={resolution_overdue}
                    response_overdue={response_overdue}
                    hold_tickets={hold_tickets}
                    pending_tickets={pending_tickets} />
                <TicketStats />
                <TicketsDisposed />
            </FlexBox>
        </>
    )
}