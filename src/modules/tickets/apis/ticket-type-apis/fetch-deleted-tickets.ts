/* eslint-disable @typescript-eslint/naming-convention */
import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';
import { ITicketDetails } from './types';

export const useFetchDeletedTickets = () => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const { getData } = useServiceClient();
  const _pageNumber =
    pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;
  const search = searchParams.get('searchText');
  const _search = search ? `&search=${search}` : '';

  const fetchMyPendingData = React.useCallback(
    () =>
      getData(
        `${TicketsEndPoint.FETCH_DELETED_TICKETS}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}${_search}`
      ).then((res) => res.json()),
    [_pageNumber, _search, getData, itemsPerPage]
  );
  return useQuery<
    { data: ITicketDetails[]; total_pages: number },
    { message: string }
  >({
    queryKey: [
      TicketsQueryKey.FETCH_DELETED_TICKETS,
      pageNumber,
      itemsPerPage,
      search,
    ],
    queryFn: fetchMyPendingData,
    keepPreviousData: true,
  });
};
