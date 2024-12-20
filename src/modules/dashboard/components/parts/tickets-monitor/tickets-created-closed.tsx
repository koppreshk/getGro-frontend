import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { getFormattedDate } from 'lib/utils';
import ReactApexChart from 'react-apexcharts';
import { useForm, FormProvider } from 'react-hook-form';
import styled, { useTheme } from 'styled-components';

import { ChartContainer } from './total-disposed';

const StyledChart = styled(ReactApexChart)``;

interface ITicketsCreatedAndCompletedProps {
  dateRange: DateRange;
}

export const TicketsCreatedAndClosed = (
  props: ITicketsCreatedAndCompletedProps
) => {
  const { dateRange } = props;
  const { pallete, dashboard } = useTheme();

  const state = {
    series: [
      {
        name: 'Created',
        data: [10, 41, 35, 51, 49, 62],
      },
      {
        name: 'Disposed',
        data: [5, 35, 15, 45, 31, 26],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        fontFamily: 'Poppins',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        row: {
          colors: ['#f1f1f1', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.75,
        },
      },
      xaxis: {
        categories: [
          'Facebook',
          'Instagram',
          'Whatsapp',
          'Telephonic',
          'Email',
          'Twitter',
        ],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [90, 95, 100],
        },
      },
      colors: [dashboard.graphBgColor1, dashboard.graphBgColor2],
    } as ApexOptions,
  };

  const form = useForm({
    defaultValues: {
      groupBy: 'source',
    },
  });

  return (
    <FormProvider {...form}>
      <ChartContainer flexDirection="column" width="100%" gap="5px">
        <FlexBox flexDirection="column">
          <FlexBox justifyContent="space-between" width="100%">
            <FlexBox flexDirection="column">
              <Typography variant="h4">Tickets Created vs Disposed</Typography>
              <Typography variant="subheading2" color={pallete.grayVariant3}>
                {getFormattedDate(dateRange!.startDate!.toISOString(), {
                  dateStyle: 'medium',
                })}{' '}
                -{' '}
                {getFormattedDate(dateRange!.endDate!.toISOString(), {
                  dateStyle: 'medium',
                })}
              </Typography>
            </FlexBox>
            <SelectField
              sx={{ width: '200px' }}
              label="GroupBy"
              size="small"
              menuOptions={[{ key: 'source', value: 'Source' }]}
              name="groupBy"
            />
          </FlexBox>
        </FlexBox>
        <StyledChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </ChartContainer>
    </FormProvider>
  );
};
