import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { useServiceClient } from 'lib';
import { DateTime } from 'luxon';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { DashboardEndPoint, DashboardQueryKeys } from './apis';

export interface ISLAValues {
  sla_applied_tickets: SlaAppliedTickets;
  sla_breaches: SlaBreaches;
}

interface SlaBreaches {
  unique_ticket_count: number;
  response_breach_percentage: number;
  response_breached_count: number;
  resolution_breach_percentage: number;
  resolution_breached_count: number;
  total_breaches: number;
}
interface SlaAppliedTickets {
  unique_ticket_count: number;
  sla_breach_percentage: number;
  sla_breached_count: number;
  sla_achieved_count: number;
  sla_achieved_percentage: number;
}

export const useFetchSLAValues = (dateRange: DateRange) => {
  const { getData } = useServiceClient();
  const parsedFromDate = DateTime.fromISO(
    dateRange.startDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const parsedToDate = DateTime.fromISO(
    dateRange.endDate!.toISOString()
  ).toFormat('yyyy-MM-dd');

  const fetchAllSLAValues = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${DashboardEndPoint.FETCH_SLA_VALUES}?from=${parsedFromDate}&to=${parsedToDate}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, parsedFromDate, parsedToDate]
  );

  return useQuery<ISLAValues, { message: string }>({
    queryKey: [DashboardQueryKeys.FETCH_DASHBOARD_DATA, dateRange],
    queryFn: fetchAllSLAValues,
  });
};
