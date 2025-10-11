import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';
import { useAPIFilters } from './fetch-all-tickets';
import { ITicketDetails } from './types';

export const useFetchAllPendingTickets = () => {
  const { getData } = useServiceClient();
  const { queryString, finalFilters } = useAPIFilters();

  const fetchAllPendingData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_ALL_PENDING_TICKETS}?${queryString}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, queryString]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [TicketsQueryKey.FETCH_ALL_PENDING_TICKETS, finalFilters],
    queryFn: fetchAllPendingData,
    keepPreviousData: true,
  });
};
