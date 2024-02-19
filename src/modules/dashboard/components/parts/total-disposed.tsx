import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import Chart from 'react-apexcharts';
import styled from 'styled-components';

const chartMetadata = {
    options: {
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            lines: {
                show: false
            },
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        dataLabels: {
            enabled: false
        },
    },
    series: [{
        name: 'Shubham',
        data: [30, 40, 35, 50, 49, 60, 56]
    },
    {
        name: 'Koppresh',
        data: [12, 4, 66, 77, 98, 44, 23]
    },
    {
        name: 'Anup',
        data: [10, 20, 35, 50, 39, 80, 46]
    },
    {
        name: 'Siddarth',
        data: [7, 15, 35, 45, 49, 76, 53]
    },
    {
        name: 'Sanjay',
        data: [43, 54, 47, 98, 23, 66, 88]
    },
    {
        name: 'Mouin',
        data: [12, 42, 22, 55, 25, 29, 87]
    },],
}

export const ChartContainer = styled(FlexBox)`
    background: #fff;
    padding: 20px 20px 0 20px;
    border-radius: 8px;
`;

export const TotalDisposed = () => {
    return (
        <ChartContainer flexDirection='column' width='33%'>
            <Typography variant='h3'>Total Disposed</Typography>
            <Chart options={chartMetadata.options} series={chartMetadata.series} type="area" height="350px" width={'100%'} />
        </ChartContainer>
    )
}