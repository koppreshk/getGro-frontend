import { FlexBox, GridLayout } from "lib/ui-ux";
import { AgentTicketStats } from "./agent-ticket-stats";
import { DashboardDateRangePicker } from "../dashboard-date-range-picker";
import React from "react";
import { DateTime } from "luxon";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { SLABreached } from "./sla-breached";
import { CustomerSatifaction } from "./customer-satifaction";

interface IAgentPerformanceProps {

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AgentPerformance = (_props: IAgentPerformanceProps) => {
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: DateTime.now().minus({ month: 1 }).toJSDate(), endDate: new Date() });

    return (
        <>
            <FlexBox flexDirection="column" gap="15px" height="100%" padding="20px">
                <FlexBox justifyContent="flex-end" alignItems="center">
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <AgentTicketStats />
                <SLABreached />
                <GridLayout $gridTemplateColumns={'2fr 1fr'} $gridGap={'20px'}>
                    <CustomerSatifaction />
                </GridLayout>
            </FlexBox>
        </>
    )
}