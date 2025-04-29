/* eslint-disable @typescript-eslint/naming-convention */
import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from './api-enums';
import { ITicketDetails } from './ticket-type-apis/types';

export const useGetTicketsDataByKey = (
  queryEndPoint: keyof typeof TicketsEndPoint,
  queryKey: keyof typeof TicketsQueryKey
) => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const search = searchParams.get('searchText');

  const { getData } = useServiceClient();
  const _pageNumber =
    pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;
  const _search = search ? `&search=${search}` : '';

  const getTicketsData = React.useCallback(
    () =>
      getData(
        `${TicketsEndPoint[queryEndPoint]}?${_pageNumber}items_per_page=${itemsPerPage ?? '10'}${_search}`
      ).then((res) => res.json()),
    [_pageNumber, _search, getData, itemsPerPage, queryEndPoint]
  );
  return useQuery<{ data: ITicketDetails[]; total_pages: number }>({
    queryKey: [TicketsQueryKey[queryKey], pageNumber, itemsPerPage],
    queryFn: getTicketsData,
    keepPreviousData: true,
  });
};
