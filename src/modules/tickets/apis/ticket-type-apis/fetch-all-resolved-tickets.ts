import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';
import { useAPIFilters } from './fetch-all-tickets';
import { ITicketDetails } from './types';

export const useFetchAllResolvedTickets = () => {
  const { getData } = useServiceClient();
  const { finalFilters, queryString } = useAPIFilters();

  const fetchAllResolvedData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_ALL_RESOLVED_TICKETS}?${queryString}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, queryString]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [TicketsQueryKey.FETCH_ALL_RESOLVED_TICKETS, finalFilters],
    queryFn: fetchAllResolvedData,
    keepPreviousData: true,
  });
};
