import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';
import { useAPIFilters } from './fetch-all-tickets';
import { ITicketDetails } from './types';

export const useFetchMyClosedTickets = () => {
  const { getData } = useServiceClient();
  const { finalFilters, queryString } = useAPIFilters();

  const fetchMyPendingData = React.useCallback(
    () =>
      getData(`${TicketsEndPoint.FETCH_MY_CLOSED}?${queryString}`).then((res) =>
        res.json()
      ),
    [getData, queryString]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [TicketsQueryKey.FETCH_MY_CLOSED, finalFilters],
    queryFn: fetchMyPendingData,
    keepPreviousData: true,
  });
};
