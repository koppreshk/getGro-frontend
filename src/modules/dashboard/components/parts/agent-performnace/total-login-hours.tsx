import { Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { StyledContainer } from "./customer-satifaction";

export const TotalLoginHours = () => {
    const data = {
        series: [6, 1.5, 0.5, 0.3],
        options: {
            chart: {
                fontFamily: 'Poppins',
                type: 'donut',
            },
            labels: ['Active', 'Busy', 'Away', 'Do not disturb', 'Offline'],
            plotOptions: {
                pie: {
                    customScale: 0.8,
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                formatter(w) {
                                    const total = w.globals.series.reduce((acc: number, curr: number) => acc += curr);
                                    const [preDecimalValue, postDecimalValue] = total.toString().split('.');
                                    const min = (postDecimalValue/10) * 60;
                                    return `${preDecimalValue} hr ${min} min`
                                },
                            }
                        }
                    }
                }

            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val < 1 ? `${val * 60} min` : `${val} hr`
                    }
                }
            }
            // colors: ['#17e254', '#ec3427', '#ffef0e', '#d80e00', '#c9c2c2']
        } as ApexOptions
    };

    return (
        <StyledContainer gap="20px" flexDirection="column">
            <Typography variant="h5">Total Login Hours</Typography>
            <ReactApexChart options={data.options} series={data.series} type="donut" />
        </StyledContainer>
    )
}