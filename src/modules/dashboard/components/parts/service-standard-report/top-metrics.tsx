import { Typography } from '@mui/material';
import { FlexBox, GridLayout } from 'lib/ui-ux';
import { useFormatedNumberByLocale } from 'lib/utils';
import { QueryData, ServiceStdReportValues } from 'modules/dashboard/apis';
import styled, { useTheme } from 'styled-components';

const Metric = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.white};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  padding: 20px;
  width: 100%;
`;

interface ITopMetricProps {
  name: string;
  value: QueryData;
  onClick?: () => void;
}

const TopMetric = (props: { item: ITopMetricProps }) => {
  const {
    value: { name: queryName, queries },
    name,
    onClick,
  } = props.item;
  const { pallete } = useTheme();
  const getFormatedNumberByLocale = useFormatedNumberByLocale();

  return (
    <Metric
      flexDirection="column"
      gap="10px"
      alignItems="center"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <Typography sx={{ color: pallete.grayNeutral }} variant="subheading1">
        {name}
      </Typography>
      <FlexBox gap="20px" alignItems="center">
        <Typography variant="h6">{queryName}: </Typography>
        <Typography variant="h2">
          {getFormatedNumberByLocale(queries)}
        </Typography>
      </FlexBox>
    </Metric>
  );
};

interface ITopMetricsProps {
  metricsData: ServiceStdReportValues;
}

export const TopMetrics = ({ metricsData }: ITopMetricsProps) => {
  const { department, issue_category, source, store } = metricsData;

  const getHighest = (arr: QueryData[]) => {
    return arr.length
      ? arr.reduce((max, item) => (item.queries > max.queries ? item : max))
      : { name: 'No data available', queries: 0 };
  };
  const data = [
    {
      name: 'Source generating max queries/Reviews',
      value: getHighest(source),
    },
    {
      name: 'Store having max queries/Reviews',
      value: getHighest(store),
    },
    {
      name: 'Category generating max queries/Reviews',
      value: getHighest(issue_category),
    },
    {
      name: 'Department generating max queries/Reviews',
      value: getHighest(department),
    },
  ] as ITopMetricProps[];

  return (
    <GridLayout $gridGap="20px" $gridTemplateColumns={'repeat(4, 1fr)'}>
      {data.map((item, idx) => (
        <TopMetric item={item} key={idx} />
      ))}
    </GridLayout>
  );
};
