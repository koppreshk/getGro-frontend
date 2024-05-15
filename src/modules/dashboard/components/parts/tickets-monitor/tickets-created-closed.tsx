import { ApexOptions } from "apexcharts";
import { useForm, FormProvider } from 'react-hook-form';
import ReactApexChart from "react-apexcharts";
import styled, { useTheme } from "styled-components";
import { Typography } from "@mui/material"
import { DateTime } from "luxon";
import { FlexBox } from "lib/ui-ux"
import { ChartContainer } from "./total-disposed";
import { SelectField } from "lib/form-fields";

const StyledChart = styled(ReactApexChart)`
    .apexcharts-title-text {
        font-weight: 400
    }
`;

export const TicketsCreatsClosed = () => {
    const { pallete, dashboard } = useTheme();

    const state = {
        series: [{
            name: "Created",
            data: [10, 41, 35, 51, 49, 62]
        },
        {
            name: "Solved",
            data: [5, 35, 30, 45, 31, 26]
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
            grid: {
                row: {
                    colors: ['#f1f1f1', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.75
                },
            },
            xaxis: {
                categories: ['facebook', 'instagram', 'whatsapp', 'telephonic', 'email', 'twitter'],
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
            },
            colors: [dashboard.graphBgColor1, dashboard.graphBgColor2]
        } as ApexOptions

    };

    const previousUnit = { month: 1 };
    const form = useForm({
        defaultValues: {
            groupBy: 'source'
        }
    });

    return (
        <FormProvider {...form}>
            <ChartContainer flexDirection="column" width="100%" gap="5px">
                <FlexBox flexDirection="column">
                    <FlexBox justifyContent="space-between" width="100%">
                        <FlexBox flexDirection="column">
                            <Typography variant="h4">Tickets Created vs Closed</Typography>
                            <Typography variant="subheading2" color={pallete.grayVariant3}>
                                {DateTime.now().minus(previousUnit).toLocaleString(DateTime.DATE_MED)} - {DateTime.local().toLocaleString(DateTime.DATE_MED)}
                            </Typography>
                        </FlexBox>
                        <SelectField sx={{ width: '200px' }} label="GroupBy" size="small" menuOptions={[{ key: 'source', value: 'source' }]} name="groupBy" />
                    </FlexBox>
                </FlexBox>
                <StyledChart
                    options={state.options}
                    series={state.series}
                    type="area" height={350} />
            </ChartContainer>
        </FormProvider>
    )
}
