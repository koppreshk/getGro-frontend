import { Typography } from "@mui/material"
import { FlexBox, GridLayout } from "lib/ui-ux"
import { CustomCircularProgress } from "./first-contact-resolution"
import styled, { useTheme } from "styled-components";
import { SentimentSatisfiedOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined } from '@mui/icons-material';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const StyledContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const CustomerSatifaction = () => {
    const { semantics } = useTheme();
    return (
        <StyledContainer gap="20px" flexDirection="column">
            <Typography variant="h6">Customer Satisfaction (CSAT)</Typography>
            <GridLayout $gridTemplateColumns={'1fr 1fr'} $gridGap={'30px'}>
                <FlexBox style={{ borderRight: semantics.standardBorder }} justifyContent="space-between" padding="30px" alignItems="center">
                    <CustomCircularProgress value={33.3} />
                    <FlexBox flexDirection="column" gap="20px">
                        <Typography>Survey Response</Typography>
                        <FlexBox flexDirection="column">
                            <SurveyResponse subHeading="Sent" value="10" />
                            <SurveyResponse subHeading="Responded" value="3" />
                            <SurveyResponse subHeading="Response Rate" value="33.3%" />
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
                <CustomerResponse />
            </GridLayout>
        </StyledContainer>
    )
}

const CustomerResponse = () => {
    const responses = [{ type: 'Positive', totalSent: 0, responded: 0 }, { type: 'Neutral', totalSent: 0, responded: 0 }, { type: 'Negative', totalSent: 0, responded: 0 }]
    return (
        <>
            <FlexBox padding="20px" gap={'20px'}>
                {responses.map((res) => <Response {...res} key={res.type} />)}
            </FlexBox>
        </>
    )
}

const StyledResponse = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const Response = (props: {
    type: string;
    totalSent: number;
    responded: number;
}) => {
    const { responded, totalSent, type } = props;
    return (
        <StyledResponse height="100%" padding="10px 20px" width="116px" flexDirection="column" gap="20px" alignItems="center" style={{ background: type === 'Positive' ? '#ecfcf2' : type === 'Negative' ? '#fef2f1' : '#fff9eb' }}>
            <Typography variant="subheading2">{type}</Typography>
            {type === 'Positive' ? <SentimentSatisfiedOutlined fontSize="large" sx={{ color: "#2eb916" }} /> : type === 'Neutral' ? <SentimentNeutralOutlined fontSize="large" sx={{ color: "#e1a304" }} /> : <SentimentDissatisfiedOutlined fontSize="large" sx={{ color: "#f9390f" }} />}
            <Typography variant="h6">{responded + '/' + totalSent}</Typography>
        </StyledResponse>
    )
}

const SurveyResponse = (props: { value: string, subHeading: string }) => {
    const { value, subHeading } = props;
    return (
        <FlexBox gap="10px">
            <Typography variant="h6">{subHeading} -</Typography>
            <Typography variant="h6">{value}</Typography>
        </FlexBox>
    )
}

export const TotalLoginHours = () => {
    const data = {
        series: [5, 1, 0.5, 0.3],
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
                                    return `${total} hr`
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
            <Typography variant="h6">Total Login Hours</Typography>
            <ReactApexChart options={data.options} series={data.series} type="donut" />
        </StyledContainer>
    )
}