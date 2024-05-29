import { Typography } from "@mui/material"
import { FlexBox, GridLayout } from "lib/ui-ux"
import { CustomCircularProgress } from "./first-contact-resolution"
import styled, { useTheme } from "styled-components";
import { SentimentSatisfiedOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined } from '@mui/icons-material';

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
    return (
        <StyledContainer gap="20px" flexDirection="column">
            <Typography variant="h6">Total Login Hours</Typography>
            <FlexBox alignItems="center" height="100%" width="100%" justifyContent="center">
                <Typography>No Results found</Typography>
            </FlexBox>
        </StyledContainer>
    )
}