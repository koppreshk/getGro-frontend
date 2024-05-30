import React from "react";
import { FlexBox } from "lib/ui-ux"
import { SLAmetricsChart, TicketsBreached } from ".";
import { DashboardDateRangePicker } from "../dashboard-date-range-picker";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { DateTime } from "luxon";


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
    const [dateRange, setDateRange] = React.useState<DateRange>({ startDate: DateTime.now().minus({ month: 1 }).toJSDate(), endDate: new Date() });

    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="25px 25px">
                <FlexBox justifyContent="flex-end" alignItems="center">
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <TicketsBreached breachedData={breachedData} />
                <SLAmetricsChart />
            </FlexBox>
        </>
    )
}