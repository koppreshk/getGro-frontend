import { Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { ChartContainer } from './total-disposed';
import { ApexOptions } from 'apexcharts';
import { FlexBox } from 'lib/ui-ux';
import { ChannelsInfo } from 'modules/dashboard/apis';

const getChartMetadata = (channelsInfo: ChannelsInfo) => {
    return {
        series: Object.values(channelsInfo),
        options: {
            chart: {
                fontFamily: 'Poppins',
                width: 400,
                height: 480,
                type: 'pie',
            },
            labels: Object.keys(channelsInfo),
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
}

export const TicketsBySource = (props: { channelsInfo: ChannelsInfo }) => {
    const { channelsInfo } = props;

    const chartMetadata = getChartMetadata(channelsInfo);

    return (
        <>
            <ChartContainer flexDirection="column">
                <Typography variant='h4'>Channel Contribution</Typography>
                <FlexBox alignItems='center' height='100%'>
                    <Chart options={chartMetadata.options} series={chartMetadata.series} type="pie" width={430} />
                </FlexBox>
            </ChartContainer>
        </>
    )
}