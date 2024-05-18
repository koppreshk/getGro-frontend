import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { CustomCircularProgress } from "./first-contact-resolution"
import styled from "styled-components"

const StyledContainer = styled(FlexBox)`
    background: ${({ theme }) => theme.pallete.white};
    padding: 20px;
    borderRadius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const CustomerSatifaction = () => {
    return (
        <StyledContainer gap="20px" flexDirection="column">
            <Typography variant="h6">Customer Satisfaction (CSAT)</Typography>
            <FlexBox gap="80px">
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
        </StyledContainer>
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