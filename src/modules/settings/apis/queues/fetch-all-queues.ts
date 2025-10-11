import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './apis';

export interface Employee {
  firstName: string;
  lastName: string | null;
  id: number;
  email?: string;
}

export interface Queue {
  id: number;
  name: string;
  uniqueKey: string;
  assignedEmployees: Employee[];
}

export interface ITicketQueues {
  queues: Queue[];
  total_pages: number;
  employees: Employee[];
}

export const useFetchAllTicketQueues = () => {
  const { getData } = useServiceClient();

  const fetchAllTicketsQueue = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ConfigurationsEndPoint.FETCH_ALL_TICKETS_QUEUE}?page=1&items_per_page=10`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<ITicketQueues, { message: string }>({
    queryKey: ConfigurationsQueryKey.FETCH_ALL_TICKETS_QUEUE,
    queryFn: fetchAllTicketsQueue,
    keepPreviousData: true,
    staleTime: 600000, // Data is considered fresh for 10 minutes
    cacheTime: 900000,
  });
};
