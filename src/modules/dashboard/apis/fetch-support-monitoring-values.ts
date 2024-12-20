import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { useServiceClient } from 'lib';
import { DateTime } from 'luxon';
import React from 'react';
import { useQuery } from 'react-query';

import { DashboardEndPoint, DashboardQueryKeys } from './api-enums';

export interface SupportMonitoringValues {
  total_tickets: number;
  pending_tickets: number;
  response_overdue: number;
  resolution_overdue: number;
  email: number;
  ivr: number;
  whatsapp: number;
}

export const useFetchSupportMonitoringValues = (dateRange: DateRange) => {
  const { getData } = useServiceClient();
  const parsedFromDate = DateTime.fromISO(
    dateRange.startDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const parsedToDate = DateTime.fromISO(
    dateRange.endDate!.toISOString()
  ).toFormat('yyyy-MM-dd');

  const fetchSupportMonitoringData = React.useCallback(
    () =>
      getData(
        `${DashboardEndPoint.SUPPORT_MONITORING}?from=${parsedFromDate}&to=${parsedToDate}`
      ).then((res) => res.json()),
    [getData, parsedFromDate, parsedToDate]
  );

  return useQuery<SupportMonitoringValues, { message: string }>({
    queryKey: [DashboardQueryKeys.SUPPORT_MONITORING, dateRange],
    queryFn: fetchSupportMonitoringData,
  });
};
