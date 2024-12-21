import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { CustomersEndPoint, CustomersQueryKeys } from './api-enums';

export interface ICustomerData {
  id: number;
  name: string;
  email: string;
  number?: string | null;
}

export const useFetchAllCustomers = () => {
  const [searchParams] = useSearchParams();
  const itemsPerPage = searchParams.get('noOfRecords');
  const pageNumber = searchParams.get('pageNumber');
  const search = searchParams.get('searchText');
  const { getData } = useServiceClient();
  const pageNumberParsed =
    pageNumber === undefined ? '' : `page=${pageNumber ?? '1'}&`;
  const searchParsed = search ? `&search=${search}` : '';

  const fetchAllPriorities = React.useCallback(
    () =>
      getData(
        `${CustomersEndPoint.FETCH_ALL_CUSTOMERS}?${pageNumberParsed}items_per_page=${itemsPerPage ?? '10'}${searchParsed}`
      ).then((res) => res.json()),
    [getData, itemsPerPage, pageNumberParsed, searchParsed]
  );

  return useQuery<
    { data: ICustomerData[]; total_pages: number },
    { message: string }
  >({
    queryKey: [CustomersQueryKeys.FETCH_ALL_CUSTOMERS, search, pageNumber],
    queryFn: fetchAllPriorities,
  });
};
