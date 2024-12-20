import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { LinearProgressProps, Typography } from '@mui/material';
import { FlexBox, GridLayout } from 'lib/ui-ux';
import { getFormatedNumberByLocale } from 'lib/utils';
import { IDashboardData } from 'modules/dashboard/apis';
import styled, { useTheme } from 'styled-components';

const Metric = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.white};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  padding: 20px;
  width: 100%;
`;

interface ITopMetricProps extends Pick<LinearProgressProps, 'color'> {
  name: string;
  value: number;
  trends: { trendType: string; change: string };
}

export const TopFiveMetrics = (
  props: Pick<
    IDashboardData,
    | 'total_tickets'
    | 'pending_tickets'
    | 'completed_tickets'
    | 'reopened_tickets'
    | 'first_contact_resolutions'
  >
) => {
  const {
    completed_tickets,
    first_contact_resolutions,
    pending_tickets,
    reopened_tickets,
    total_tickets,
  } = props;
  const data = [
    {
      name: 'Total TIckets',
      value: total_tickets,
      trends: { trendType: 'positive', change: '67%' },
      color: 'success',
    },
    {
      name: 'Pending TIckets',
      value: pending_tickets,
      trends: { trendType: 'negative', change: '48.7%' },
      color: 'primary',
    },
    {
      name: 'Completed Tickets',
      value: completed_tickets,
      trends: { trendType: 'positive', change: '45%' },
      color: 'secondary',
    },
    {
      name: 'FCR (First Contact Resolution)',
      value: first_contact_resolutions,
      trends: { trendType: 'negative', change: '12%' },
      color: 'info',
    },
    {
      name: 'Reopened Tickets',
      value: reopened_tickets,
      trends: { trendType: 'negative', change: '34.6%' },
      color: 'info',
    },
  ] as ITopMetricProps[];

  return (
    <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(5, 1fr)'}>
      {data.map((item, idx) => (
        <TopMetric item={item} key={idx} />
      ))}
    </GridLayout>
  );
};

const TopMetric = (props: { item: ITopMetricProps }) => {
  const { name, value, trends } = props.item;
  const { pallete } = useTheme();

  return (
    <Metric flexDirection="column" gap="10px" alignItems="center">
      <Typography sx={{ color: pallete.grayNeutral }} variant="subheading1">
        {name}
      </Typography>
      <FlexBox gap="20px" alignItems="center">
        <Typography variant="h2">{getFormatedNumberByLocale(value)}</Typography>
      </FlexBox>
      <Trends trends={trends} />
    </Metric>
  );
};

const ParameterPill = styled(FlexBox)<{ $trendType: string }>`
  background: ${({ $trendType }) =>
    $trendType === 'positive' ? '#f2f8f4' : '#fdefec'};
  color: ${({ $trendType }) =>
    $trendType === 'positive' ? '#5fb284' : '#eb7c65'};
  border-radius: 24px;
  height: 24px;
`;

const Trends = (props: Pick<ITopMetricProps, 'trends'>) => {
  const { trends } = props;
  const { pallete } = useTheme();
  const TrendIcon = trends.trendType === 'positive' ? TrendingUp : TrendingDown;

  return (
    <FlexBox
      style={{
        borderTop: `1px solid ${pallete.grayVariant5}`,
        paddingTop: '8px',
      }}
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
    >
      <ParameterPill
        padding="0 8px"
        gap="8px"
        alignItems="center"
        $trendType={trends.trendType}
      >
        <TrendIcon sx={{ width: '16px', height: '16px' }} />
        <Typography variant="subheading1">
          {trends.trendType === 'positive' ? '+' : '-'}
          {trends.change}
        </Typography>
      </ParameterPill>
      <Typography variant="subheading2" sx={{ color: pallete.grayNeutral }}>
        since last month
      </Typography>
    </FlexBox>
  );
};
