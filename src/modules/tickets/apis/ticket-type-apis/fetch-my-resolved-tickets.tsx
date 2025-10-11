import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';
import { useAPIFilters } from './fetch-all-tickets';
import { ITicketDetails } from './types';

export const useFetchMyResolvedTickets = () => {
  const { getData } = useServiceClient();
  const { queryString, finalFilters } = useAPIFilters();

  const getMyResolvedTickets = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_MY_RESOLVED}?${queryString}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, queryString]
  );

  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryFn: getMyResolvedTickets,
    queryKey: [TicketsQueryKey.FETCH_MY_RESOLVED, finalFilters],
  });
};
