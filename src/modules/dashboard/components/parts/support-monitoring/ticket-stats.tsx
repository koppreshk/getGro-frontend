import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";
import { DateFilters } from "../tickets-monitor/date-filters";
import { useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField } from "lib/form-fields";
import { SupportMonitoringValues } from "modules/dashboard/apis";

const StyledContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    box-shadow: 0 4px 8px -2px #1018281a,0 2px 4px -2px #18212f0f;
`;

export const TicketStats = (props: Pick<SupportMonitoringValues, 'tickets_created' | 'replies_by_agents' | 'response_pending' | 'tickets_closed' | 'replies_by_customers' | 'resolution_pending'>) => {
    const { tickets_created, replies_by_agents, replies_by_customers, resolution_pending, response_pending, tickets_closed } = props;
    const quickStats1 = [{
        name: 'Tickets Created',
        value: tickets_created,
    }, {
        name: 'Replies By Agent',
        value: replies_by_agents
    }, {
        name: 'Response Pending',
        value: response_pending
    }];

    const quickStats2 = [{
        name: 'Tickets Closed',
        value: tickets_closed
    }, {
        name: 'Replies By Customers',
        value: replies_by_customers
    }, {
        name: 'Resolution Pending',
        value: resolution_pending
    }]

    const [filterValue, setFilters] = useState('Today');

    const onFilterChangeHandler = useCallback((value: string) => {
        setFilters(value);
    }, []);

    const { pallete } = useTheme();

    return (
        <>
            <StyledContainer padding="20px" flexDirection="column" gap="20px" width="calc(70% - 20px)">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Ticket Statistics</Typography>
                    <DateFilters onFilterChangeHandler={onFilterChangeHandler} filterValue={filterValue} dateFilterTypes={['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days']} />
                </FlexBox>
                <FlexBox width="100%">
                    <FlexBox gap="20px" width="40%" style={{ borderRight: `1px solid ${pallete.grayVariant1}` }}>
                        <FlexBox flexDirection="column" gap="60px" width="50%">
                            {quickStats1.map((item) => <QuickStats key={item.name} item={item} />)}
                        </FlexBox>
                        <FlexBox flexDirection="column" gap="60px" width="50%">
                            {quickStats2.map((item) => <QuickStats key={item.name} item={item} />)}
                        </FlexBox>
                    </FlexBox>
                    <TicketsCreated />
                </FlexBox>
            </StyledContainer>
        </>
    )
}

const QuickStats = (props: {
    item: {
        name: string;
        value: number;
        renderSeparator?: boolean
    }
}) => {
    const { name, value } = props.item;
    const { dashboard, pallete } = useTheme();
    return (
        <FlexBox flexDirection="column" gap="10px" style={{ borderLeft: `3px solid ${dashboard.graphBgColor1}`, paddingLeft: '15px' }}>
            <Typography sx={{ color: pallete.grayVariant3 }} variant="h6">{name}</Typography>
            <Typography variant="h3">{value}</Typography>
        </FlexBox>
    )
}

const TicketsCreated = () => {
    const form = useForm({
        defaultValues: {
            groupBy: 'status'
        }
    });

    const data = {
        series: [{
            data: [2, 10, 7]
        }],
        options: {
            chart: {
                fontFamily: 'Poppins',
                id: 'apexchart-example'
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Unassgined', 'Pending', 'Completed']
            }
        } as ApexOptions
    };

    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" width="60%" padding="0px 0px 0px 40px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6">Tickets Created</Typography>
                    <SelectField menuOptions={[{ key: 'status', value: 'Status' }, { key: 'priority', value: 'Priority' }, { key: 'source', value: 'Source' }]} name="groupBy" label="Group By" size="small" sx={{ width: '200px' }} />
                </FlexBox>
                <ReactApexChart options={data.options} series={data.series} type="bar" height={285} width={'100%'} />
            </FlexBox>
        </FormProvider>
    )
}