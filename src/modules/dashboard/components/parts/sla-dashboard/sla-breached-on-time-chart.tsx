import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { SlaComparisondata } from 'modules/dashboard/apis';
import ReactApexChart from 'react-apexcharts';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.pallete.white};
  padding: 20px 20px 0 20px;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

interface IgroupByPriorityDataProps {
  groupByPriorityData: SlaComparisondata;
}

export const SlaBreachedOnTimeChart = (props: IgroupByPriorityDataProps) => {
  const { groupByPriorityData } = props;
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      groupBy: 'priority',
    },
  });

  const menuOptions = [{ key: 'priority', value: t('priority') }];

  const data = {
    series: [
      {
        name: t('sla_achieved_tickets'),
        data: Object.values(groupByPriorityData).map(
          (item) => item.achieved_count
        ),
      },
      {
        name: t('sla_breached_tickets'),
        data: Object.values(groupByPriorityData).map(
          (item) => item.breach_count
        ),
      },
      {
        name: t('total_sla_tickets'),
        data: Object.values(groupByPriorityData).map(
          (item) => item.total_tickets
        ),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        fontFamily: 'poppins',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: Object.keys(groupByPriorityData),
      },
      yaxis: {
        title: {
          text: t('ticket_count'),
        },
      },
      fill: {
        opacity: 1,
      },
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
          <Typography variant="h5">
            {' '}
            {t('sla_achieved_vs_breached_tickets')}
          </Typography>
          <SelectField
            menuOptions={menuOptions}
            name="groupBy"
            label={t('group_by')}
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
