import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { StyledLayout } from "./agent-ticket-stats";
import styled, { useTheme } from "styled-components";

const data = [{
    sectionHeading: 'First Response',
    value1: '100%',
    postFixValue1: '(1 out 1)',
    subText1: 'Breached',
    value2: '64h 42m',
    subText2: 'Average Violation time'
}, {
    sectionHeading: 'Next Response',
    value1: '33.3%',
    postFixValue1: '(1 out 3)',
    subText1: 'Breached',
    value2: '32h 32m',
    subText2: 'Average Violation time'
}, {
    sectionHeading: 'Resolution',
    value1: '--',
    postFixValue1: '',
    subText1: 'Breached',
    value2: '--',
    subText2: 'Average Violation time'
}]

export const SLABreached = () => {
    return (
        <FlexBox gap='20px' flexDirection="column" padding="20px" style={{ background: '#fff', borderRadius: '8px' }}>
            <Typography>SLA Breached</Typography>
            <StyledLayout $gridTemplateColumns={'1fr 1fr 1fr'} $gridGap={'20px'}>
                {data.map((item) => <SectionMetrics key={item.sectionHeading} {...item} />)}
            </StyledLayout>
        </FlexBox>
    )
}

interface ISectionMetricsProps {
    sectionHeading: string;
    value1: string;
    postFixValue1: string;
    subText1: string;
    value2: string;
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
                        <Typography variant="body3">{postFixValue1}</Typography>
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