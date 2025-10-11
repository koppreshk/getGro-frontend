import { DateRange } from '@matharumanpreet00/react-daterange-picker';
import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { DashboardEndPoint, DashboardQueryKeys } from './apis';

export interface IDashboardData {
  total_tickets: number;
  pending_tickets: number;
  completed_tickets: number;
  first_contact_resolutions: number;
  reopened_tickets: number;
  channels_info: {
    [key: string]: number;
  };
  total_completed_by_users: TotalCompletedByUsers;
}

export interface ChannelsInfo {
  Instagram: number;
  Email: number;
  Facebook: number;
}

export interface TotalCompletedByUsers {
  [key: string]: number;
}

export const useFetchDashboardData = (dateRange: DateRange) => {
  const { getData } = useServiceClient();
  const parsedFromDate = dateRange.startDate!.toISOString();
  const parsedToDate = dateRange.endDate!.toISOString();

  const fetchAllDashboardData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${DashboardEndPoint.FETCH_DASHBOARD_DATA}?from=${parsedFromDate}&to=${parsedToDate}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, parsedFromDate, parsedToDate]
  );

  return useQuery<IDashboardData, { message: string }>({
    queryKey: [DashboardQueryKeys.FETCH_DASHBOARD_DATA, dateRange],
    queryFn: fetchAllDashboardData,
  });
};
