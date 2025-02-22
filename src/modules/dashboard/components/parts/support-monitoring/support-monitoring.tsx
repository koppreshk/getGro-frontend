import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { FlexBox } from 'lib/ui-ux';

import { TicketStats } from './ticket-stats';
import { TicketsBySource } from './tickets-by-source';
import { TopFourMetrics } from './top-four-metrics';
import { SupportMonitoringValues } from '../../../apis/fetch-support-monitoring-values';
import { DashboardDateRangePicker } from '../dashboard-date-range-picker';
import { DownloadSMData } from './download-sm-data';

interface ISupportMonitoringProps {
  data: SupportMonitoringValues;
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const SupportMonitoring = (props: ISupportMonitoringProps) => {
  const { dateRange, setDateRange } = props;
  const {
    total_tickets,
    pending_tickets,
    resolution_overdue,
    response_overdue,
    email,
    ivr,
    whatsapp,
  } = props.data;

  return (
    <>
      <FlexBox
        flexDirection="column"
        gap="20px"
        height="100%"
        width="100%"
        padding="0px 25px"
      >
        <FlexBox justifyContent="flex-end" alignItems="center" gap={'20px'}>
          <DashboardDateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          <DownloadSMData data={props.data} dateRange={dateRange} />
        </FlexBox>
        <TopFourMetrics
          resolution_overdue={resolution_overdue}
          response_overdue={response_overdue}
          total_tickets={total_tickets}
          pending_tickets={pending_tickets}
        />
        <FlexBox gap={'20px'} width="100%">
          <TicketsBySource
            channelsInfo={{ Email: email, Whatsapp: whatsapp, IVR: ivr }}
          />
          <TicketStats dateRange={dateRange} />
        </FlexBox>
      </FlexBox>
    </>
  );
};
