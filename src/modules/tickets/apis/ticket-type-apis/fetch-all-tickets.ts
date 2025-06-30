import { useServiceClient } from 'lib';
import { useAppSelector } from 'lib/hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';
import { ITicketDetails } from './types';

export const useAPIFilters = () => {
  const reduxFilters = useAppSelector((state) => state.tickets.filters);
  const [searchParams] = useSearchParams();

  // extract from URL
  const urlFilters = React.useMemo(() => {
    const apiURLMappedKeys = {
      pageNumber: 'page',
      noOfRecords: 'items_per_page',
      searchText: 'search',
    };
    const filters: Record<string, string> = {};
    const keys: (keyof typeof apiURLMappedKeys)[] = [
      'pageNumber',
      'noOfRecords',
      'searchText',
    ];
    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        filters[apiURLMappedKeys[key]] = val;
      }
    });
    return filters;
  }, [searchParams]);

  // merge redux + url
  const finalFilters = React.useMemo(
    () => ({
      ...reduxFilters, // from filter popup (Redux)
      ...urlFilters, // these stay in the URL
    }),
    [urlFilters, reduxFilters]
  );

  // build query string
  const queryString = React.useMemo(() => {
    return Object.entries(finalFilters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&');
  }, [finalFilters]);

  return { queryString, finalFilters };
};

export const useFetchAllTickets = () => {
  const { getData } = useServiceClient();
  const { queryString, finalFilters } = useAPIFilters();

  const fetchAllData = React.useCallback(
    () =>
      getData(`${TicketsEndPoint.FETCH_ALL_TICKETS}?${queryString}`).then(
        (res) => res.json()
      ),
    [getData, queryString]
  );

  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [TicketsQueryKey.FETCH_ALL_TICKETS, finalFilters],
    queryFn: fetchAllData,
    keepPreviousData: true,
  });
};
