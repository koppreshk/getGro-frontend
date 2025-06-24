import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { useServiceClient } from 'lib';
import { DateTime } from 'luxon';
import React from 'react';
import { useQuery } from 'react-query';

import { DashboardEndPoint, DashboardQueryKeys } from './api-enums';

export type QueryData = {
  name: string;
  queries: number;
};

export interface ServiceStdReportValues {
  store: QueryData[];
  source: QueryData[];
  department: QueryData[];
  issue_category: QueryData[];
}

export const useFetchServerStdReport = (dateRange: DateRange) => {
  const { getData } = useServiceClient();
  const parsedFromDate = DateTime.fromISO(
    dateRange.startDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const parsedToDate = DateTime.fromISO(
    dateRange.endDate!.toISOString()
  ).toFormat('yyyy-MM-dd');

  const fetchServiceStdReportData = React.useCallback(
    () =>
      getData(
        `${DashboardEndPoint.SERVICE_STANDARD_REPORT}?from=${parsedFromDate}&to=${parsedToDate}`
      ).then((res) => res.json()),
    [getData, parsedFromDate, parsedToDate]
  );

  return useQuery<ServiceStdReportValues, { message: string }>({
    queryKey: [DashboardQueryKeys.SERVICE_STANDARD_REPORT, dateRange],
    queryFn: fetchServiceStdReportData,
  });
};
