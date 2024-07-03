import React from "react";
import { FlexBox } from "lib/ui-ux"
import { SLAmetricsChart, TicketsBreached } from ".";
import { DashboardDateRangePicker } from "../dashboard-date-range-picker";
import { DateRange } from "@matharumanpreet00/react-daterange-picker";
import { ISLAValues } from "modules/dashboard/apis";

interface ISLADashboardProps {
    data: ISLAValues;
    dateRange: DateRange;
    setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const SLADashboard = (props: ISLADashboardProps) => {
    const { data, dateRange, setDateRange } = props;

    return (
        <>
            <FlexBox flexDirection="column" gap="20px" height="100%" width="100%" padding="25px 25px">
                <FlexBox justifyContent="flex-end" alignItems="center">
                    <DashboardDateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
                </FlexBox>
                <TicketsBreached data={data} />
                <SLAmetricsChart groupByPriorityData={data.sla_comparison_data}/>
            </FlexBox>
        </>
    )
}