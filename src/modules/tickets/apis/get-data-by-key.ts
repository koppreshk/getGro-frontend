/* eslint-disable @typescript-eslint/naming-convention */
import { useServiceClient } from 'lib';
import { useAppSelector } from 'lib/hooks'; // assuming you have this
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from './apis';
import { ITicketDetails } from './ticket-type-apis/types';

export const useGetTicketsDataByKey = (
  queryEndPoint: keyof typeof TicketsEndPoint,
  queryKey: keyof typeof TicketsQueryKey
) => {
  const [searchParams] = useSearchParams();
  const filtersFromStore = useAppSelector((store) => store.tickets.filters);

  const itemsPerPage = searchParams.get('noOfRecords') || '10';
  const pageNumber = searchParams.get('pageNumber') || '1';
  const search = searchParams.get('searchText');

  const { getData } = useServiceClient();

  // Build the final query params object
  const finalParams = {
    page: pageNumber,
    items_per_page: itemsPerPage,
    ...(search ? { search } : {}),
    ...filtersFromStore, // includes filter keys like assignee, status, etc.
  };

  const queryString = new URLSearchParams(finalParams).toString();

  const getTicketsData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint[queryEndPoint]}?${queryString}`,
        extra: { signal },
      }).then((res) => res.json()),
    [queryString, getData, queryEndPoint]
  );

  return useQuery<{ data: ITicketDetails[]; total_pages: number }>({
    queryKey: [TicketsQueryKey[queryKey], finalParams], // keeps cache unique
    queryFn: getTicketsData,
    keepPreviousData: true,
  });
};
