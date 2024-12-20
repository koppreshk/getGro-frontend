import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { CenteredCircularProgress } from 'lib/ui-ux';
import { DateTime } from 'luxon';
import React from 'react';

import { useFetchDashboardData } from '../apis';
import { TicketMonitor } from '../components/parts/tickets-monitor/tickets-monitor';

export const TicketMonitoringDashContainer = () => {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    startDate: DateTime.now().minus({ month: 1 }).toJSDate(),
    endDate: new Date(),
  });

  const { data, isLoading } = useFetchDashboardData(dateRange);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data && Object.keys(data).length) {
    return (
      <TicketMonitor
        data={data}
        setDateRange={setDateRange}
        dateRange={dateRange}
      />
    );
  }

  return <span>Error</span>;
};
