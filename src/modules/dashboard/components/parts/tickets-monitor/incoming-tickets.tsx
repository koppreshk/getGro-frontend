import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FlexBox } from 'lib/ui-ux';
import Chart from 'react-apexcharts';
import styled, { useTheme } from 'styled-components';

export const ChartContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px 20px 0 20px;
    border-radius: 8px;
`;

export const IncomingTickets = () => {
    const { dashboard } = useTheme();
    const chartMetadata = {
        options: {
            chart: {
                fontFamily: 'Poppins',
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
            colors: [dashboard.graphBgColor1]
        } as ApexOptions,
        series: [{
            name: 'Tickets Received',
            data: [30, 40, 35, 50, 49, 60, 56]
        }],
    }

    return (
        <ChartContainer flexDirection='column'>
            <Typography variant='h4'>Incoming Tickets</Typography>
            <Chart options={chartMetadata.options} series={chartMetadata.series} type="bar" height="350px" width={'100%'} />
        </ChartContainer>
    )
}