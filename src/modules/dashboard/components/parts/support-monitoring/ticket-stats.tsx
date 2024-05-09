import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import styled, { useTheme } from "styled-components";
import { DateFilters } from "../tickets-monitor/date-filters";
import { useState, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FormProvider, useForm } from "react-hook-form";
import { SelectField } from "lib/form-fields";

const StyledContainer = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    box-shadow: 0 4px 8px -2px #1018281a,0 2px 4px -2px #18212f0f;
`;

export const TicketStats = () => {
    const quickStats1 = [{
        name: 'Tickets Created',
        value: 1,
    }, {
        name: 'Replies By Agent',
        value: 5
    }, {
        name: 'Response Pending',
        value: 7
    }];

    const quickStats2 = [{
        name: 'Tickets Closed',
        value: 1
    }, {
        name: 'Replies By Contact',
        value: 5
    }, {
        name: 'Resolution Pending',
        value: 7
    }]

    const [filterValue, setFilters] = useState('Today');

    const onFilterChangeHandler = useCallback((value: string) => {
        setFilters(value);
    }, []);

    const { pallete } = useTheme();

    return (
        <>
            <StyledContainer padding="20px" flexDirection="column" gap="20px">
                <FlexBox justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Ticket Statistics</Typography>
                    <DateFilters onFilterChangeHandler={onFilterChangeHandler} filterValue={filterValue} dateFilterTypes={['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days']} />
                </FlexBox>
                <FlexBox width="100%">
                    <FlexBox gap="20px" width="40%" padding="0px 0px 0px 50px" style={{ borderRight: `1px solid ${pallete.grayVariant1}` }}>
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
    const { dashboard } = useTheme();

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
            },
            colors: [dashboard.graphBgColor1]
        } as ApexOptions
    };

    return (
        <FormProvider {...form}>
            <FlexBox flexDirection="column" width="60%" padding="0px 0px 0px 40px">
                <FlexBox justifyContent="space-between">
                    <Typography variant="h6">Tickets Created</Typography>
                    <SelectField menuOptions={[{ key: 'status', value: 'Status' }]} name="groupBy" label="Group By" size="small" sx={{ width: '200px' }} />
                </FlexBox>
                <ReactApexChart options={data.options} series={data.series} type="bar" height={285} width={'100%'} />
            </FlexBox>
        </FormProvider>
    )
}