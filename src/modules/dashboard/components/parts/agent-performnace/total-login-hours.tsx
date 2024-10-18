import { Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { StyledContainer } from "./customer-satifaction";
import { FlexBox, MoreInformation } from "lib/ui-ux";

export const TotalLoginHours = (props: {
    userStats: {
        [key: string]: string
    }
}) => {
    const { userStats } = props;
    const dataDoesNotExists = Object.keys(userStats).length === 0;

    const data = {
        series: Object.values(userStats).map((item) => Number(item.split(' ')[0])),
        options: {
            chart: {
                fontFamily: 'Poppins',
                type: 'donut',
            },
            labels: Object.keys(userStats),
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
                                    const hours = Math.floor(total);  // Get the whole number of hours
                                    const minutes = Math.round((total - hours) * 60);
                                    return `${hours} hr ${minutes} min`
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
            },
            colors: ['#17e254', '#ffef0e', '#c9c2c2']
        } as ApexOptions
    };

    return (
        <StyledContainer gap="20px" flexDirection="column">
            <Typography variant="h5">Total Login Hours</Typography>
            <FlexBox alignItems='center' justifyContent='center' height='100%'>
                {dataDoesNotExists
                    ? <MoreInformation information='No results found' />
                    : <ReactApexChart options={data.options} series={data.series} type="donut" />
                }
            </FlexBox>
        </StyledContainer>
    )
}