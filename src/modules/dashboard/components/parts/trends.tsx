import { Typography } from "@mui/material"
import { ApexOptions } from "apexcharts";
import { FlexBox } from "lib/ui-ux"
import ReactApexChart from "react-apexcharts";
import { ChartContainer } from "./total-disposed";
import styled, { useTheme } from "styled-components";

const StyledChart = styled(ReactApexChart)`
    .apexcharts-title-text {
        font-weight: 400
    }
`;

export const Trends = () => {
    const { pallete } = useTheme();
    const state = {
        series: [{
            name: "Resolved",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                fontFamily: 'Poppins',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f1f1f1', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.75
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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

    const section1 = [{ label: 'Resolved', value: '45' }, { label: 'Average first response time', value: '12m' }, { label: 'Resolution within SLA', value: '91%' }]
    const section2 = [{ label: 'Received', value: '100' }, { label: 'Average response time', value: '22m 12s' }]

    return (
        <ChartContainer flexDirection="column" width="100%" gap="5px">
            <FlexBox flexDirection="column">
                <Typography variant="h4">Trends</Typography>
                <Typography variant="subheading2" color={pallete.grayVariant3}>20/02/2024</Typography>
            </FlexBox>
            <FlexBox width="100%" gap="30px">
                <StyledChart
                    options={state.options}
                    series={state.series}
                    type="area" height={350} width={866} />
                <FlexBox gap="35px" flexWrap="wrap" width="calc(100% - 866px)">
                    <FlexBox flexDirection="column" gap="20px">
                        {section1.map((item, idx) => <Stats key={idx} label={item.label} value={item.value} />)}
                    </FlexBox>
                    <FlexBox flexDirection="column" gap="20px">
                        {section2.map((item, idx) => <Stats key={idx} label={item.label} value={item.value} />)}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
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