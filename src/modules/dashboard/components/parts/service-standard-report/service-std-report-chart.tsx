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
  selectedChartType: 'pie' | 'bar';
}

const ChartContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.white};
  padding: 20px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  width: 100%;
`;

export const ServiceStdReportChart = (props: ServiceStdReportChartProps) => {
  const { data: sampleData, selectedChartType } = props;

  const chartSections: ChartConfig[] = [
    { title: 'Overall Interactions store wise', data: sampleData.store },
    { title: 'Source', data: sampleData.source },
    { title: 'Department', data: sampleData.department },
    { title: 'Issue Category', data: sampleData.issue_category },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '2rem',
        padding: '1rem',
        width: '100%',
      }}
    >
      {chartSections.map((section, index) => {
        const labels = section.data.map((item) => item.name);
        const seriesData = section.data.map((item) => item.queries);

        const baseOptions: ApexCharts.ApexOptions = {
          chart: {
            type: selectedChartType,
            toolbar: { show: false },
          },
          legend: {
            position: selectedChartType === 'pie' ? 'right' : 'bottom',
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val} queries`,
            },
          },
        };

        const pieOptions: ApexCharts.ApexOptions = {
          ...baseOptions,
          labels,
          dataLabels: {
            enabled: true,
            formatter: function (val: number, opts: any) {
              return `${opts.w.globals.labels[opts.seriesIndex]}: ${val.toFixed(1)}%`;
            },
          },
        };

        const barOptions: ApexCharts.ApexOptions = {
          ...baseOptions,
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: false,
              columnWidth: '70%',
            },
          },
          xaxis: {
            categories: labels,
            labels: {
              rotate: -45,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val: number) {
              return `${val}`;
            },
          },
        };

        const options = selectedChartType === 'pie' ? pieOptions : barOptions;
        const series =
          selectedChartType === 'pie'
            ? seriesData
            : [{ name: 'Queries', data: seriesData }];

        return (
          <ChartContainer
            flexDirection="column"
            justifyContent="space-between"
            key={index}
          >
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography variant="h5">{section.title}</Typography>
            </FlexBox>

            <FlexBox
              alignItems="center"
              justifyContent="center"
              height="100%"
              width="100%"
              style={{ marginTop: '1rem' }}
            >
              {seriesData.length === 0 ? (
                <Typography variant="body1" color="textSecondary">
                  No data available
                </Typography>
              ) : (
                <Chart
                  options={options}
                  series={series}
                  type={selectedChartType}
                  width="500"
                  height={300}
                />
              )}
            </FlexBox>
          </ChartContainer>
        );
      })}
    </div>
  );
};
