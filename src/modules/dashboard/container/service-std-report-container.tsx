import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import { DateTime } from 'luxon';
import React from 'react';

import { useFetchServerStdReport } from '../apis';
import { ServiceStandardReport } from '../components/parts/service-standard-report/service-std-report';

export const ServiceStandardContainer = () => {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    startDate: DateTime.now().minus({ month: 1 }).toJSDate(),
    endDate: new Date(),
  });

  const { data, error, isLoading } = useFetchServerStdReport(dateRange);
  if (isLoading) {
    return <CenteredCircularProgress />;
  }
  if (data) {
    return (
      <>
        <ServiceStandardReport
          data={data}
          setDateRange={setDateRange}
          dateRange={dateRange}
        />
      </>
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
