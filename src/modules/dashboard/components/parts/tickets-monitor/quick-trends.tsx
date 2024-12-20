import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import styled, { useTheme } from 'styled-components';

import { ChartContainer } from './incoming-tickets';

const StatsContainer = styled(FlexBox)`
  border-left: 3px solid ${({ theme }) => theme.dashboard.graphBgColor1};
`;

export const QuickTrends = () => {
  const { dashboard } = useTheme();
  const section1 = [
    { label: 'Resolved', value: '45' },
    { label: 'Average first response time', value: '12m' },
    { label: 'Resolution within SLA', value: '91%' },
    { label: 'Received', value: '100' },
    { label: 'Average response time', value: '22m 12s' },
  ];

  return (
    <ChartContainer flexDirection="column" gap="20px">
      <FlexBox gap="4px" alignItems="center">
        <Typography variant="h4">Trends</Typography>
        <TrendingUpIcon sx={{ color: dashboard.graphTextColor1 }} />
      </FlexBox>
      <FlexBox gap="20px" width="calc(100% - 866px)" alignItems="center">
        <FlexBox flexDirection="column" gap="20px">
          {section1.map((item, idx) => (
            <Stats key={idx} label={item.label} value={item.value} />
          ))}
        </FlexBox>
      </FlexBox>
    </ChartContainer>
  );
};

const Stats = (props: { label: string; value: string }) => {
  const { label, value } = props;
  const { pallete } = useTheme();

  return (
    <>
      <StatsContainer
        flexDirection="column"
        padding="0px 0px 0px 15px"
        style={{}}
      >
        <Typography variant="subheading1" color={pallete.grayVariant3}>
          {label}
        </Typography>
        <Typography variant="h3">{value}</Typography>
      </StatsContainer>
    </>
  );
};
