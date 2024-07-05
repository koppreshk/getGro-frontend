import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { StyledLayout } from "./agent-ticket-stats";
import styled, { useTheme } from "styled-components";
import { Datav1 } from "modules/dashboard/apis";


export const SLABreached = (props: Pick<Datav1, 'first_response_breached' | 'first_response_achieved' | 'first_response_breach_str' | 'next_response_breached' | 'next_response_achieved' | 'next_response_breach_str' |'resolution_achieved' | 'resolution_breached' | 'resolution_breach_str'>) => {
    const { first_response_breached, first_response_achieved, next_response_breached, next_response_achieved, next_response_breach_str, resolution_achieved,
        resolution_breached, resolution_breach_str, first_response_breach_str } = props;

    const data = [{
        sectionHeading: 'First Response',
        value1: first_response_breached,
        postFixValue1: first_response_breach_str,
        subText1: 'No of Tickets breached',
        value2: first_response_achieved,
        subText2: 'No of Tickets SLA achieved'
    }, {
        sectionHeading: 'Next Response',
        value1: next_response_breached,
        postFixValue1: next_response_breach_str,
        subText1: 'No of Tickets breached',
        value2: next_response_achieved,
        subText2: 'No of Tickets SLA achieved'
    }, {
        sectionHeading: 'Resolution',
        value1: resolution_breached,
        postFixValue1: resolution_breach_str,
        subText1: 'No of Tickets breached',
        value2: resolution_achieved,
        subText2: 'No of Tickets SLA achieved'
    }]

    return (
        <FlexBox gap='20px' flexDirection="column" padding="20px" style={{ background: '#fff', borderRadius: '8px' }}>
            <Typography variant="h5">SLA Breached</Typography>
            <StyledLayout $gridTemplateColumns={'1fr 1fr 1fr'} $gridGap={'20px'}>
                {data.map((item) => <SectionMetrics key={item.sectionHeading} {...item} />)}
            </StyledLayout>
        </FlexBox>
    )
}

interface ISectionMetricsProps {
    sectionHeading: string;
    value1: number;
    postFixValue1: string;
    subText1: string;
    value2: number;
    subText2: string;
}

const SectionMetricsContainer = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
    padding-right: 30px !important;
`;

const SectionMetrics = (props: ISectionMetricsProps) => {
    const { sectionHeading, value1, postFixValue1, subText1, subText2, value2 } = props;
    const { pallete } = useTheme();
    return (
        <SectionMetricsContainer gap="20px" flexDirection="column" className="single-stat-container">
            <Typography sx={{ color: pallete.grayNeutral }} variant="body2">{sectionHeading}</Typography>
            <FlexBox justifyContent="space-between">
                <FlexBox flexDirection="column" gap="15px">
                    <FlexBox gap="4px" alignItems="baseline">
                        <Typography variant="h4" color="#db6803">{value1}</Typography>
                        <Typography variant="body3">{`(${postFixValue1})`}</Typography>
                    </FlexBox>
                    <Typography variant="body2">{subText1}</Typography>
                </FlexBox>
                <FlexBox flexDirection="column" gap="15px">
                    <Typography variant="h4" color="#db6803">{value2}</Typography>
                    <Typography variant="body2">{subText2}</Typography>
                </FlexBox>
            </FlexBox>
        </SectionMetricsContainer>
    )
}