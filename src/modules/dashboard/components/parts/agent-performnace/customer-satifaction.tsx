import { Typography } from "@mui/material"
import { FlexBox, GridLayout } from "lib/ui-ux"
import { CustomCircularProgress } from "./first-contact-resolution"
import styled, { useTheme } from "styled-components";
import { SentimentSatisfiedOutlined, SentimentDissatisfiedOutlined, SentimentNeutralOutlined } from '@mui/icons-material';
import { CSAT } from "modules/dashboard/apis";

export const StyledContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px;
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const CustomerSatifaction = (props: { csat: CSAT }) => {
    const { response_rate, sent_count, rated_count } = props.csat;
    const { semantics } = useTheme();
    return (
        <StyledContainer gap="20px" flexDirection="column">
            <Typography variant="h5" >Customer Satisfaction (CSAT)</Typography>
            <GridLayout $gridTemplateColumns={'1fr 1fr'} $gridGap={'30px'}>
                <FlexBox style={{ borderRight: semantics.standardBorder }} justifyContent="space-between" padding="30px" alignItems="center">
                    <CustomCircularProgress value={response_rate} />
                    <FlexBox flexDirection="column" gap="20px">
                        <Typography variant="body1">Survey Response</Typography>
                        <FlexBox flexDirection="column">
                            <SurveyResponse subHeading="Sent" value={sent_count} />
                            <SurveyResponse subHeading="Responded" value={rated_count} />
                            <SurveyResponse subHeading="Response Rate" value={response_rate} />
                        </FlexBox>
                    </FlexBox>
                </FlexBox>
                <CustomerResponse {...props} />
            </GridLayout>
        </StyledContainer>
    )
}

const CustomerResponse = (props: { csat: CSAT }) => {
    const { negative_rating, neutral_rating, positive_rating, total_rating } = props.csat;
    const responses = [
        { type: 'Positive', totalSent: total_rating, responded: positive_rating },
        { type: 'Neutral', totalSent: total_rating, responded: neutral_rating },
        { type: 'Negative', totalSent: total_rating, responded: negative_rating }]

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

const SurveyResponse = (props: { value: number, subHeading: string }) => {
    const { value, subHeading } = props;
    return (
        <FlexBox gap="10px">
            <Typography variant="h6">{subHeading} -</Typography>
            <Typography variant="h6">{value}</Typography>
        </FlexBox>
    )
}
