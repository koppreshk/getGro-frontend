import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FlexBox } from 'lib/ui-ux';
import { TotalCompletedByUsers } from 'modules/dashboard/apis';
import Chart from 'react-apexcharts';
import styled, { IDashboardColors, useTheme } from 'styled-components';

// TODO: Can be used later
// const chartMetadata = {
//     options: {
//         chart: {
//             fontFamily: 'Poppins',
//             id: 'apexchart-example',
//             zoom: {
//                 enabled: false
//             }
//         },
//         xaxis: {
//             lines: {
//                 show: false
//             },
//             categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//         },
//         dataLabels: {
//             enabled: false
//         },
//     } as ApexOptions,
//     series: [{
//         name: 'Shubham',
//         data: [30, 40, 35, 50, 49, 60, 56]
//     },
//     {
//         name: 'Koppresh',
//         data: [12, 4, 66, 77, 98, 44, 23]
//     },
//     {
//         name: 'Anup',
//         data: [10, 20, 35, 50, 39, 80, 46]
//     },
//     {
//         name: 'Siddarth',
//         data: [7, 15, 35, 45, 49, 76, 53]
//     },
//     {
//         name: 'Sanjay',
//         data: [43, 54, 47, 98, 23, 66, 88]
//     },
//     {
//         name: 'Mouin',
//         data: [12, 42, 22, 55, 25, 29, 87]
//     },],
// }

const getChartMetadata = (totalCompletedByUsers: TotalCompletedByUsers, dashboard: IDashboardColors) => {
    return {
        series: [{ data: Object.values(totalCompletedByUsers) }],
        options: {
            chart: {
                fontFamily: 'Poppins',
                type: 'bar',
            },
            xaxis: {
                categories: Object.keys(totalCompletedByUsers)
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                }
            },
            colors: [dashboard.graphBgColor2, dashboard.graphBgColor3, dashboard.graphBgColor4, dashboard.graphBgColor5, dashboard.graphBgColor6, dashboard.graphBgColor7],
        } as ApexOptions,
    }
}

export const ChartContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px 20px 0 20px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

interface ITotalDisposedProps {
    totalCompletedByUsers: TotalCompletedByUsers;
}

export const TotalDisposed = (props: ITotalDisposedProps) => {
    const { totalCompletedByUsers } = props;
    const { dashboard } = useTheme();
    const chartMetadata = getChartMetadata(totalCompletedByUsers, dashboard);

    return (
        <ChartContainer flexDirection='column' justifyContent='space-between'>
            <Typography variant='h4'>Total Disposed</Typography>
            <Chart options={chartMetadata.options} series={chartMetadata.series} type="bar" height="350px" width={'100%'} />
        </ChartContainer>
    )
}