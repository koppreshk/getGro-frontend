import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';
import { ITicketDetails } from './types';

export const useFetchAllTickets = () => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const search = searchParams.get('searchText');
  const { getData } = useServiceClient();
  const _pageNumber =
    pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;
  const _search = search ? `&search=${search}` : '';

  const fetchAllData = React.useCallback(
    () =>
      getData(
        `${TicketsEndPoint.FETCH_ALL_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}${_search}`
      ).then((res) => res.json()),
    [_pageNumber, _search, getData, itemsPerPage]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [
      TicketsQueryKey.FETCH_ALL_TICKETS,
      pageNumber,
      itemsPerPage,
      search,
    ],
    queryFn: fetchAllData,
    keepPreviousData: true,
  });
};
