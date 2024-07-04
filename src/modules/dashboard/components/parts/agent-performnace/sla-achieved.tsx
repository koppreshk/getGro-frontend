import { Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { StyledLayout } from "./agent-ticket-stats";
import styled, { useTheme } from "styled-components";

export const SLAAchieved = () => {

    const data = [{
        sectionHeading: 'First Response',
        value1: 0,
        postFixValue1: '(1 out 1 dummy)',
        subText1: 'Achieved'
    }, {
        sectionHeading: 'Next Response',
        value1: 0,
        postFixValue1: '(1 out 3 dummy)',
        subText1: 'Achieved'
    },
    {
        value1: 0,
        sectionHeading: 'Resolution',
        postFixValue1: '(1 out 3 dummy)',
        subText1: 'Achieved'
    }]

    return (
        <FlexBox gap='20px' flexDirection="column" padding="20px" style={{ background: '#fff', borderRadius: '8px' }}>
            <Typography variant="h5">SLA Achieved</Typography>
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
}

const SectionMetricsContainer = styled(FlexBox)`
    border-right: ${({ theme }) => theme.semantics.standardBorder};
    padding-right: 30px !important;
`;

const SectionMetrics = (props: ISectionMetricsProps) => {
    const { sectionHeading, value1, postFixValue1, subText1 } = props;
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
            </FlexBox>
        </SectionMetricsContainer>
    )
}