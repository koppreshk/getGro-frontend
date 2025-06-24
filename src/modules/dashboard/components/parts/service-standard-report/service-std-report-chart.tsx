import { Typography } from '@mui/material';
import { FlexBox } from 'lib/ui-ux';
import { QueryData, ServiceStdReportValues } from 'modules/dashboard/apis';
import Chart from 'react-apexcharts';
import { styled } from 'styled-components';

interface ChartConfig {
  title: string;
  data: QueryData[];
}

interface ServiceStdReportChartProps {
  data: ServiceStdReportValues;
}

const ChartContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.white};
  padding: 20px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const ServiceStdReportChart = (props: ServiceStdReportChartProps) => {
  const { data: sampleData } = props;
  const chartSections: ChartConfig[] = [
    { title: 'Queries by Store', data: sampleData.store },
    { title: 'Queries by Source', data: sampleData.source },
    { title: 'Queries by Department', data: sampleData.department },
    { title: 'Queries by Issue Category', data: sampleData.issue_category },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        padding: '1rem',
      }}
    >
      {chartSections.map((section, index) => {
        const labels = section.data.map((item) => item.name);
        const series = section.data.map((item) => item.queries);

        const options: ApexCharts.ApexOptions = {
          chart: {
            type: 'pie',
          },
          labels,
          legend: {
            position: 'right',
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val} queries`,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val: number, opts: any) {
              return `${opts.w.globals.labels[opts.seriesIndex]}: ${val.toFixed(
                1
              )}%`;
            },
          },
        };

        return (
          <ChartContainer
            flexDirection="column"
            justifyContent="space-between"
            key={index}
          >
            <FlexBox justifyContent="space-between" alignItems="center">
              <Typography variant="h5">{section.title}</Typography>
            </FlexBox>
            <FlexBox alignItems="center" justifyContent="center" height="100%">
              {series.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  No data available
                </Typography>
              ) : (
                <Chart
                  options={options}
                  series={series}
                  type="pie"
                  width={500}
                />
              )}
            </FlexBox>
          </ChartContainer>
        );
      })}
    </div>
  );
};
