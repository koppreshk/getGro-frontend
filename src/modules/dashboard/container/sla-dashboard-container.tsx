import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import { DateTime } from 'luxon';
import React from 'react';

import { useFetchSLAValues } from '../apis';
import { SLADashboard } from '../components/parts/sla-dashboard';

export const SLADashboardContainer = () => {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    startDate: DateTime.now().minus({ month: 1 }).toJSDate(),
    endDate: new Date(),
  });

  const { data, isLoading, isRefetching, error } = useFetchSLAValues(dateRange);

  if (isLoading || isRefetching) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <SLADashboard
        data={data}
        setDateRange={setDateRange}
        dateRange={dateRange}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
