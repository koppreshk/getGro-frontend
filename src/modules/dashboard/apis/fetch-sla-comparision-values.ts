import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { useServiceClient } from 'lib';
import { DateTime } from 'luxon';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { DashboardEndPoint, DashboardQueryKeys } from './apis';

export interface SlaComparisondata {
  PriorityTypes: PriorityTypes;
  High: PriorityTypes;
  Critical: PriorityTypes;
  Normal: PriorityTypes;
}
interface PriorityTypes {
  achieved_count: number;
  breach_count: number;
  total_tickets: number;
}

export const useFetchSLAComparisionValues = (
  dateRange: DateRange,
  filterValue: string
) => {
  const { getData } = useServiceClient();
  const parsedFromDate = DateTime.fromISO(
    dateRange.startDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const parsedToDate = DateTime.fromISO(
    dateRange.endDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const slaMetrics = filterValue
    .split(' ')
    .map((item) => item.toLocaleLowerCase())
    .join('_');

  const fetchAllSLAComparisionValues = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${DashboardEndPoint.SLA_COMPARISION}?from=${parsedFromDate}&to=${parsedToDate}&sla_metrics=${slaMetrics}&group_by=priority`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, parsedFromDate, parsedToDate, slaMetrics]
  );

  return useQuery<
    { data: SlaComparisondata; group_by: string; metric_type: string },
    { message: string }
  >({
    queryKey: [DashboardQueryKeys.SLA_COMPARISION, dateRange, filterValue],
    queryFn: fetchAllSLAComparisionValues,
  });
};
