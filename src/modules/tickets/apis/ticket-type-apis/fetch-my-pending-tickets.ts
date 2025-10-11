import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';
import { useAPIFilters } from './fetch-all-tickets';
import { ITicketDetails } from './types';

export const useFetchMyPendingTickets = () => {
  const { getData } = useServiceClient();
  const { queryString, finalFilters } = useAPIFilters();

  const fetchMyPendingData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_MY_PENDING}?${queryString}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, queryString]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [TicketsQueryKey.FETCH_MY_PENDING, finalFilters],
    queryFn: fetchMyPendingData,
    keepPreviousData: true,
  });
};
