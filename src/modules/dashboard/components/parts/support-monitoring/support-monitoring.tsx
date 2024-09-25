import { FlexBox } from "lib/ui-ux"
import { TopFourMetrics } from "./top-four-metrics";
import { TicketStats } from "./ticket-stats";
import { TicketsBySource } from "./tickets-by-source";
import { SupportMonitoringValues } from "../../../apis/fetch-support-monitoring-values";

interface ISupportMonitoringProps {
    data: SupportMonitoringValues;
}

export const SupportMonitoring = (props: ISupportMonitoringProps) => {
    const { total_tickets, pending_tickets, resolution_overdue, response_overdue, replies_by_agents, replies_by_customers,
        resolution_pending, tickets_closed, tickets_created, email, ivr, whatsapp } = props.data;

    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="0px 25px">
                <TopFourMetrics
                    resolution_overdue={resolution_overdue}
                    response_overdue={response_overdue}
                    total_tickets={total_tickets}
                    pending_tickets={pending_tickets} />
                <FlexBox gap={'20px'} width="100%">
                    <TicketsBySource channelsInfo={{ Email: email, Whatsapp: whatsapp, IVR: ivr }} />
                    <TicketStats replies_by_agents={replies_by_agents} replies_by_customers={replies_by_customers}
                        resolution_pending={resolution_pending} response_pending={resolution_pending}
                        tickets_closed={tickets_closed} tickets_created={tickets_created} />
                </FlexBox>
            </FlexBox>
        </>
    )
}