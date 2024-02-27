import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts";
import { FlexBox, GridLayout } from "lib/ui-ux"
import ReactApexChart from "react-apexcharts";
import { ChartContainer } from "./total-disposed";
import styled, { useTheme } from "styled-components";
import { DateTime } from "luxon";
import { useCallback, useState } from "react";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { DateFilters } from "./date-filters";

const StyledChart = styled(ReactApexChart)`
    .apexcharts-title-text {
        font-weight: 400
    }
`;

export const Trends = () => {
    const { pallete } = useTheme();
    const [filterValue, setFilters] = useState<'week' | 'month'>('week');

    const onFilterChangeHandler = useCallback((value: 'week' | 'month') => {
        setFilters(value);
    }, []);

    const state = {
        series: [{
            name: "Resolved",
            data: filterValue === 'month' ? [10, 41, 35, 51, 49, 62, 69, 91, 148, 45, 56, 88] : [3, 14, 45, 55, 63, 11, 34]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                fontFamily: 'Poppins',
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: `Tickets resolved in a ${filterValue === 'month' ? 'month' : 'week'}`,
                align: 'center'
            },
            grid: {
                row: {
                    colors: ['#f1f1f1', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.75
                },
            },
            xaxis: {
                categories: filterValue === 'month' ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] : ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [90, 95, 100]
                },
            }
        } as ApexOptions

    };

    const section1 = [{ label: 'Resolved', value: '45' }, { label: 'Average first response time', value: '12m' }, { label: 'Resolution within SLA', value: '91%' }, { label: 'Received', value: '100' }, { label: 'Average response time', value: '22m 12s' }]

    const previousUnit = filterValue === 'month' ? { month: 1 } : { days: 7 };
    return (
        <ChartContainer flexDirection="column" width="100%" gap="5px">
            <FlexBox flexDirection="column" width="65%">
                <FlexBox justifyContent="space-between">
                    <FlexBox gap="4px" alignItems="center">
                        <Typography variant="h4">Trends</Typography>
                        <TrendingUpIcon color="info" />
                    </FlexBox>
                    <DateFilters onFilterChangeHandler={onFilterChangeHandler} filterValue={filterValue} />
                </FlexBox>
                <Typography variant="subheading2" color={pallete.grayVariant3}>
                    {DateTime.now().minus(previousUnit).toLocaleString(DateTime.DATE_MED)} - {DateTime.local().toLocaleString(DateTime.DATE_MED)}
                </Typography>
            </FlexBox>
            <GridLayout $gridTemplateColumns={'3fr 1fr'} $gridGap="20px">
                <StyledChart
                    options={state.options}
                    series={state.series}
                    type="area" height={350} />
                <FlexBox gap="20px" width="calc(100% - 866px)" alignItems="center">
                    <FlexBox flexDirection="column" gap="20px">
                        {section1.map((item, idx) => <Stats key={idx} label={item.label} value={item.value} />)}
                    </FlexBox>
                </FlexBox>
            </GridLayout>
        </ChartContainer>
    )
}

const StatsContainer = styled(FlexBox)`
    border-left: 3px solid #4b94dc;
`;

const Stats = (props: { label: string, value: string }) => {
    const { label, value } = props;
    const { pallete } = useTheme();

    return (
        <>
            <StatsContainer flexDirection="column" padding="0px 0px 0px 15px" style={{}}>
                <Typography variant="subheading1" color={pallete.grayVariant3}>{label}</Typography>
                <Typography variant="h3">{value}</Typography>
            </StatsContainer>
        </>
    )
}
