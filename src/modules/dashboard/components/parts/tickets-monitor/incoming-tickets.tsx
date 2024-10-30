import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FlexBox } from 'lib/ui-ux';
import Chart from 'react-apexcharts';
import styled, { useTheme } from 'styled-components';

export const ChartContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px 20px 0 20px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
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
                categories: ['Facebook', 'Instagram', 'Whatsapp', 'Telephonic', 'Email', 'Twitter']
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            colors: [dashboard.graphBgColor1]
        } as ApexOptions,
        series: [{
            name: 'Tickets Created',
            data: [10, 41, 35, 51, 49, 62]
        }],
    }

    return (
        <ChartContainer flexDirection='column' justifyContent='space-between'>
            <Typography variant='h4'>Total Created</Typography>
            <Chart options={chartMetadata.options} series={chartMetadata.series} type="line" height="350px" width={'100%'} />
        </ChartContainer>
    )
}