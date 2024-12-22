import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import ReactApexChart from 'react-apexcharts';
import { FormProvider, useForm } from 'react-hook-form';
import { styled } from 'styled-components';

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.pallete.white};
  padding: 20px 20px 0 20px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

export const SLAachivedVsBreachedTickets = () => {
  const methods = useForm({
    defaultValues: {
      groupBy: 'ticketsCount',
    },
  });

  const menuOptions = [
    { key: 'ticketsCount', value: 'Tickets Count' },
    { key: 'breachesCount', value: 'Breaches Count' },
    { key: 'priority', value: 'Priority' },
  ];

  const data = {
    series: [
      {
        data: [2, 10, 7, 8, 6, 9],
      },
    ],
    options: {
      chart: {
        fontFamily: 'Poppins',
        id: 'apexchart-example',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ['07 AM', '09 AM', '03 PM', '04 pm', '05 PM', '09 PM'],
      },
      colors: ['#6a69f6'],
    } as ApexOptions,
  };

  return (
    <FormProvider {...methods}>
      <ChartContainer>
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
          style={{ marginBottom: '24px' }}
        >
          <Typography variant="h5"> SLA Breached based on time</Typography>
          <SelectField
            menuOptions={menuOptions}
            name="groupBy"
            label="Group By"
            size="small"
            sx={{ width: '200px' }}
          />
        </FlexBox>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={350}
        />
      </ChartContainer>
    </FormProvider>
  );
};
