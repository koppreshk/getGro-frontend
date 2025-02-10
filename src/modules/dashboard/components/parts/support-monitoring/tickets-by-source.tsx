import { Typography, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FlexBox, MoreInformation } from 'lib/ui-ux';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const ChartContainer = styled(FlexBox)`
  background: ${({ theme }) => theme.pallete.white};
  padding: 20px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const getChartMetadata = (
  channelsInfo: { [key: string]: number },
  chartType: 'pie' | 'bar'
) => {
  return {
    series:
      chartType === 'pie'
        ? Object.values(channelsInfo)
        : [{ name: 'Count', data: Object.values(channelsInfo) }],

    options: {
      chart: {
        fontFamily: 'Poppins',
        type: chartType,
      },
      labels: Object.keys(channelsInfo),
      xaxis:
        chartType === 'bar'
          ? { categories: Object.keys(channelsInfo) }
          : undefined,
      dataLabels: {
        enabled: true,
        formatter: (value: number) => `${value}`, // Show only numbers, not percentage
      },
      tooltip: {
        y: {
          formatter: (value: number) => `${value}`, // Removes percentage formatting
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 400 },
            legend: { position: 'bottom' },
          },
        },
      ],
    } as ApexOptions,
  };
};

export const TicketsBySource = (props: {
  channelsInfo: { [key: string]: number };
}) => {
  const { channelsInfo } = props;
  const { t } = useTranslation();
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  const handleChartTypeChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as 'pie' | 'bar');
  };

  const chartMetadata = getChartMetadata(channelsInfo, chartType);
  const dataDoesNotExist = Object.values(channelsInfo).every(
    (item) => item === 0
  );

  return (
    <ChartContainer
      flexDirection="column"
      justifyContent="space-between"
      width="30%"
    >
      <FlexBox justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{t('channel_contribution')}</Typography>

        <Select value={chartType} onChange={handleChartTypeChange} size="small">
          <MenuItem value="pie">Pie Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
        </Select>
      </FlexBox>

      <FlexBox alignItems="center" justifyContent="center" height="100%">
        {dataDoesNotExist ? (
          <MoreInformation information="No results found" />
        ) : (
          <Chart
            options={chartMetadata.options}
            series={chartMetadata.series}
            type={chartType}
            width={380}
          />
        )}
      </FlexBox>
    </ChartContainer>
  );
};
