import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts";
import { FlexBox } from "lib/ui-ux";
import ReactApexChart from "react-apexcharts";

function generateData(count: number, yrange: { min: number; max: number; }) {
    let i = 0;
    const series = [];
    while (i < count) {
        const x = (i + 1).toString();
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}

export const TicketsDisposed = () => {
    const state = {
        series: [{
            name: 'Metric1',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric2',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric3',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric4',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric5',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric6',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric7',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric8',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        },
        {
            name: 'Metric9',
            data: generateData(30, {
                min: 0,
                max: 90
            })
        }
        ],
        options: {
            chart: {
                height: 350,
                type: 'heatmap',
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#6A69F6"],
        } as ApexOptions
    }

    return (
        <FlexBox gap="20px" width="100%" flexDirection="column" style={{ background: '#fff' }} padding="20px">
            <Typography variant="h6">Tickets Disposed</Typography>
            <ReactApexChart type="heatmap" height="350px" options={state.options} series={state.series} />
        </FlexBox >
    )
}