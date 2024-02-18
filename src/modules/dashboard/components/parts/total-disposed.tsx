import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import Chart from 'react-apexcharts';

const chartMetadata = {
    options: {
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            lines: {
                show: false
            },
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        dataLabels: {
            enabled: false
        },
    },
    series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    },
    {
        name: 'series-2',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125].map((item, idx) => idx % 3 === 0 ? item + 55 : item - 17)
    }],

}


export const TotalDisposed = () => {

    return (
        <FlexBox style={{ background: '#fff', padding: '20px 20px 0 20px', width: 'fit-content' }} flexDirection='column'>
            <Typography variant='h3'>Total Disposed</Typography>
            <Chart options={chartMetadata.options} series={chartMetadata.series} type="area" height="350px" width={'550px'} />
        </FlexBox>
    )
}