import styled, { useTheme } from "styled-components";
import { LinearProgressProps, Typography } from "@mui/material";
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { FlexBox, GridLayout } from "lib/ui-ux";
import { getFormatedNumberByLocale } from "lib/utils";

const Metric = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.white};
    border-radius: 8px;
    padding: 20px;
    width: 100%;
`;

const data = [{
    name: 'Created TIckets',
    value: 104568,
    trends: { trendType: 'positive', change: '67%' },
    color: 'success'
},
{
    name: 'Pending TIckets',
    value: 55879,
    trends: { trendType: 'negative', change: '48.7%' },
    color: 'primary'
},
{
    name: 'Disposed Tickets',
    value: 71565,
    trends: { trendType: 'positive', change: '45%' },
    color: 'secondary'
},
{
    name: 'FCR (First Contact Resolution)',
    value: 19008,
    trends: { trendType: 'negative', change: '12%' },
    color: 'info'
},
{
    name: 'Reopened Tickets',
    value: 1008,
    trends: { trendType: 'negative', change: '34.6%' },
    color: 'info'
}] as ITopMetricProps[]

interface ITopMetricProps extends Pick<LinearProgressProps, 'color'> {
    name: string;
    value: number;
    trends: { trendType: string, change: string };
}

export const TopFiveMetrics = () => {
    return (
        <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(5, 1fr)'}>
            {data.map((item, idx) => (
                <TopMetric item={item} key={idx} />
            ))}
        </GridLayout>
    )
}

const TopMetric = (props: { item: ITopMetricProps }) => {
    const { name, value, trends } = props.item;
    const { pallete } = useTheme();

    return (
        <Metric flexDirection="column" gap="10px" alignItems="center">
            <Typography sx={{ color: pallete.grayNeutral }} variant="subheading1">{name}</Typography>
            <FlexBox gap="20px" alignItems="center">
                <Typography variant="h2">{getFormatedNumberByLocale(value)}</Typography>
            </FlexBox>
            <Trends trends={trends} />
        </Metric>
    )
}

const ParameterPill = styled(FlexBox) <{ $trendType: string }>`
    background: ${({ $trendType }) => $trendType === 'positive' ? '#f2f8f4' : '#fdefec'};
    color: ${({ $trendType }) => $trendType === 'positive' ? '#5fb284' : '#eb7c65'};
    border-radius: 24px;
    height: 24px;
`;

const Trends = (props: Pick<ITopMetricProps, 'trends'>) => {
    const { trends } = props;
    const { pallete } = useTheme();
    const TrendIcon = trends.trendType === 'positive' ? TrendingUp : TrendingDown;

    return (
        <FlexBox style={{ borderTop: `1px solid ${pallete.grayVariant5}`, paddingTop: '8px' }} flexDirection="row" justifyContent="space-between" width="100%" alignItems="center">
            <ParameterPill padding="0 8px" gap="8px" alignItems="center" $trendType={trends.trendType}>
                <TrendIcon sx={{ width: '16px', height: '16px' }} />
                <Typography variant="subheading1">{trends.trendType === 'positive' ? '+' : '-'}{trends.change}</Typography>
            </ParameterPill>
            <Typography variant="subheading2" sx={{ color: pallete.grayNeutral }}>since last month</Typography>
        </FlexBox>
    )
}
