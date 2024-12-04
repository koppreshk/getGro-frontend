import { Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { FlexBox, GridLayout } from 'lib/ui-ux';
import { ISLAValues } from 'modules/dashboard/apis';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';

const StyledLayout = styled(GridLayout)`
  background: ${({ theme }) => theme.pallete.white};
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
`;

const DataGridLayout = styled(GridLayout)`
  .stats-wrapper:last-child {
    border-right: none;
  }
  .stats-wrapper:first-child {
    padding: 0;
  }
`;

const StatsWrapper = styled(FlexBox)`
  border-right: ${({ theme }) => theme.semantics.standardBorder};
  padding-left: 30px;
`;

export const TicketsBreached = (props: { data: ISLAValues }) => {
  const { data } = props;
  const { pallete } = useTheme();
  const { t } = useTranslation();
  const {
    unique_ticket_count,
    sla_breach_percentage,
    sla_breached_count,
    sla_achieved_count,
    sla_achieved_percentage,
  } = data.sla_applied_tickets;

  return (
    <GridLayout $gridTemplateColumns="repeat(2, 1fr)" $gridGap="20px">
      <StyledLayout $gridTemplateColumns="70% 30%" $padding="20px">
        <FlexBox flexDirection="column" gap="14px">
          <FlexBox gap="6px">
            <Typography variant="h5" sx={{ color: pallete.grayVariant3 }}>
              {t('sla_applied_tickets')}
            </Typography>
            <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>
              ({unique_ticket_count} {t('unique_tickets')})
            </Typography>
          </FlexBox>

          <DataGridLayout $gridTemplateColumns="repeat(2, 1fr)">
            <StatsWrapper
              gap="8px"
              flexDirection="column"
              className="stats-wrapper"
            >
              <Typography variant="body2">{t('sla_breached')}</Typography>
              <Typography variant="h2">
                {Math.round(sla_breach_percentage) || 0}%
              </Typography>
              <Typography variant="body3">
                {sla_breached_count} {t('tickets')}
              </Typography>
            </StatsWrapper>
            <StatsWrapper
              gap="8px"
              flexDirection="column"
              className="stats-wrapper"
            >
              <Typography variant="body2">{t('sla_achieved')}</Typography>
              <Typography variant="h2">
                {Math.round(sla_achieved_percentage) || 0}%
              </Typography>
              <Typography variant="body3">
                {sla_achieved_count} {t('tickets')}
              </Typography>
            </StatsWrapper>
          </DataGridLayout>
        </FlexBox>

        <TicketsBreachedChart
          breachedPercentage={Math.round(sla_breach_percentage)}
        />
      </StyledLayout>

      <StyledLayout $gridTemplateColumns="60% 40%" $padding="20px">
        <FlexBox flexDirection="column" gap="14px">
          <FlexBox gap="6px">
            <Typography variant="h5" sx={{ color: pallete.grayVariant3 }}>
              {t('sla_breached')}
            </Typography>
            <Typography variant="body3" sx={{ color: pallete.grayNeutral }}>
              ({data.sla_breaches.unique_ticket_count} {t('unique_tickets')})
            </Typography>
          </FlexBox>

          <DataGridLayout $gridTemplateColumns="repeat(2, 1fr)">
            <StatsWrapper
              gap="8px"
              flexDirection="column"
              className="stats-wrapper"
            >
              <Typography variant="body2">{t('response_breaches')}</Typography>
              <Typography variant="h2">
                {Math.round(data.sla_breaches.response_breach_percentage) || 0}%
              </Typography>
              <Typography variant="body3">
                {data.sla_breaches.response_breached_count} {t('times_count')}
              </Typography>
            </StatsWrapper>
            <StatsWrapper
              gap="8px"
              flexDirection="column"
              className="stats-wrapper"
            >
              <Typography variant="body2">
                {t('resolution_breaches')}
              </Typography>
              <Typography variant="h2">
                {Math.round(data.sla_breaches.resolution_breach_percentage) ||
                  0}
                %
              </Typography>
              <Typography variant="body3">
                {data.sla_breaches.resolution_breached_count} {t('times_count')}
              </Typography>
            </StatsWrapper>
          </DataGridLayout>
        </FlexBox>
        <FlexBox alignItems="center" height="100%">
          <SLABreachedChart
            respBreachPercent={
              Math.round(data.sla_breaches.response_breach_percentage) || 0
            }
            reslnBreachPercent={
              Math.round(data.sla_breaches.resolution_breach_percentage) || 0
            }
          />
        </FlexBox>
      </StyledLayout>
    </GridLayout>
  );
};

const TicketsBreachedChart = (prop: { breachedPercentage: number }) => {
  const data = {
    series: [prop.breachedPercentage],
    options: {
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          },
        },
      },
      labels: ['Breached'],
      colors: ['#6a69f6'],
    } as ApexOptions,
  };

  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="radialBar"
    />
  );
};

const SLABreachedChart = (props: {
  respBreachPercent: number;
  reslnBreachPercent: number;
}) => {
  const { t } = useTranslation();
  const data = {
    series: Object.values(props),
    options: {
      chart: {
        fontFamily: 'Poppins',
        type: 'donut',
      },
      labels: [t('response'), t('resolution')],
      dataLabels: {
        style: {
          fontSize: '10px',
        },
      },
      plotOptions: {
        pie: {
          customScale: 1.1,
        },
      },
    } as ApexOptions,
  };

  return (
    <ReactApexChart options={data.options} series={data.series} type="donut" />
  );
};
