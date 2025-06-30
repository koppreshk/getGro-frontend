import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';
import { useAPIFilters } from './fetch-all-tickets';
import { ITicketDetails } from './types';

export const useFetchAllClosedTickets = () => {
  const { getData } = useServiceClient();
  const { finalFilters, queryString } = useAPIFilters();

  const fetchAllClosedData = React.useCallback(
    () =>
      getData(
        `${TicketsEndPoint.FETCH_ALL_CLOSED_TICKETS}?${queryString}`
      ).then((res) => res.json()),
    [getData, queryString]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [TicketsQueryKey.FETCH_ALL_CLOSED_TICKETS, finalFilters],
    queryFn: fetchAllClosedData,
    keepPreviousData: true,
  });
};
