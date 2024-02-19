import { Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { ChartContainer } from './total-disposed';
import { ApexOptions } from 'apexcharts';
import { FlexBox } from 'lib/ui-ux';

const chartMetadata = {
    series: [44, 55, 13, 43, 22],
    options: {
        chart: {
            fontFamily: 'Poppins',
            width: 400,
            height: 480,
            type: 'pie',
        },
        labels: ['Email', 'Facebook', 'Instagram', 'Telephone', 'Twitter'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 400
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    } as ApexOptions,
}

export const TicketsBySource = () => {
    return (
        <>
            <ChartContainer flexDirection="column" width="33%">
                <Typography variant='h3'>Channel Contribution</Typography>
                <FlexBox alignItems='center' height='100%'>
                    <Chart options={chartMetadata.options} series={chartMetadata.series} type="pie" width={430} />
                </FlexBox>
            </ChartContainer>
        </>
    )
}