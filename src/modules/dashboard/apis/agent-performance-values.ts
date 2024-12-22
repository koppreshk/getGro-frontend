import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { useServiceClient } from 'lib';
import { DateTime } from 'luxon';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';

import { DashboardEndPoint, DashboardQueryKeys } from './api-enums';
import { IAgentPerformanceFormFields } from '../components/parts/agent-performnace/agent-performance';

export interface IAgentPerformance {
  queues: Queue[];
  employees: Employee[];
  data_v1: Datav1;
  type: string;
}

export interface CSAT {
  sent_count: number;
  rated_count: number;
  response_rate: number;
  positive_rating: number;
  negative_rating: number;
  neutral_rating: number;
  total_rating: number;
}
export interface Datav1 {
  first_response_achieved: number;
  next_response_achieved: number;
  resolution_achieved: number;
  first_response_str: string;
  next_response_str: string;
  resolution_str: string;
  first_response_breached: number;
  next_response_breached: number;
  resolution_breached: number;
  first_response_breach_str: string;
  next_response_breach_str: string;
  resolution_breach_str: string;
  average_first_response_time: number;
  average_next_response_time: string;
  average_resolution_time: number;
  tickets_created: number;
  tickets_assigned: number;
  total_assigned_average: number;
  tickets_resolved: number;
  tickets_closed: number;
  tickets_reopened: number;
  average_assigned_per_day: number;
  average_resolved_per_day: number;
  fcr: Fcr2;
  csat: CSAT;
  user_stats: {
    [key: string]: string;
  };
}
interface Fcr2 {
  percentage?: null | number;
  count_str: string;
}
export interface Queue {
  id: number;
  name: string;
  uniqueKey: string;
}

export interface Employee {
  firstName: string;
  lastName?: string;
  id: number;
}

export interface SlaBreached {
  first_response: FirstResponse;
  second_response: SecondResponse;
}

export interface FirstResponse {
  tickets_breached: number;
  sla_achieve: number;
}

export interface SecondResponse {
  tickets_breached: number;
  sla_achieve: number;
}

export const useFetchAgentPerformanceData = (dateRange: DateRange) => {
  const { getData } = useServiceClient();
  const parsedFromDate = DateTime.fromISO(
    dateRange.startDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const parsedToDate = DateTime.fromISO(
    dateRange.endDate!.toISOString()
  ).toFormat('yyyy-MM-dd');
  const { watch } = useFormContext<IAgentPerformanceFormFields>();
  const { filterType, filterValue } = watch();

  const finalParam =
    filterType === 'queue' && filterValue
      ? `queue_id=${filterValue}`
      : filterType === 'user' && filterValue
        ? `user_id=${filterValue}`
        : '';
  const fetchAllAgentPerformanceData = React.useCallback(
    () =>
      getData(
        `${DashboardEndPoint.AGENT_PERFORMANCE}?from=${parsedFromDate}&to=${parsedToDate}&type=${filterType}&${finalParam}`
      ).then((res) => res.json()),
    [filterType, finalParam, getData, parsedFromDate, parsedToDate]
  );

  return useQuery<IAgentPerformance, { message: string }>({
    queryKey: [
      DashboardQueryKeys.AGENT_PERFORMANCE,
      filterType,
      filterValue,
      parsedFromDate,
      parsedToDate,
    ],
    queryFn: fetchAllAgentPerformanceData,
  });
};

export const useFetchDropdownValues = () => {
  const { getData } = useServiceClient();
  const fetchAllAgentPerformanceData = React.useCallback(
    () =>
      getData(`${DashboardEndPoint.FETCH_DROPDOWN_VALUES}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<IAgentPerformance, { message: string }>({
    queryKey: [DashboardQueryKeys.FETCH_DROPDOWN_VALUES],
    queryFn: fetchAllAgentPerformanceData,
  });
};
