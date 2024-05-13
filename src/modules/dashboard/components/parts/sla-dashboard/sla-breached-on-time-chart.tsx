import { Typography } from "@mui/material";
import { ApexOptions } from "apexcharts"
import { SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import ReactApexChart from "react-apexcharts"
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";


const ChartContainer = styled.div`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px 20px 0 20px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const SlaBreachedOnTimeChart = () => {
    const methods = useForm({
        defaultValues: {
            groupBy: 'category'
        }
    });

    const menuOptions = [
        { key: 'category', value: 'Category' },
        { key: 'brand', value: 'Catebrandgory' },
        { key: 'priority', value: 'Priority' },
    ];

    const data = {

        series: [{
            name: 'SLA Achived Tickets',
            data: [2, 3, 3, 4]
        }, {
            name: 'SLA Breached Tickets',
            data: [3, 3, 4, 3]
        }, {
            name: 'Total SLA Tickets',
            data: [3, 2, 3, 2]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
            },
            yaxis: {
                title: {
                    text: 'Ticket Count'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        } as ApexOptions
    }

    return (
        <FormProvider {...methods}>
            <ChartContainer>
                <FlexBox justifyContent="space-between" alignItems="center" style={{marginBottom: '24px'}}>
                    <Typography variant="h5"> SLA Achieved vs Breached Tickets</Typography>
                    <SelectField menuOptions={menuOptions} name="groupBy" label="Group By" size="small" sx={{ width: '200px' }} />
                </FlexBox>
                <ReactApexChart options={data.options} series={data.series} type="bar" height={350} />
            </ChartContainer>
        </FormProvider>
    )
}