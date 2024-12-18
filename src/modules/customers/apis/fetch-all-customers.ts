import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { CustomersEndPoint, CustomersQueryKeys } from './api-enums';

export interface ICustomerData {
  id: number;
  name: string;
  email: string;
  number?: string | null;
}

export const useFetchAllCustomers = () => {
  const { getData } = useServiceClient();

  const fetchAllPriorities = React.useCallback(
    () =>
      getData(CustomersEndPoint.FETCH_ALL_CUSTOMERS).then((res) => res.json()),
    [getData]
  );

  return useQuery<ICustomerData[], { message: string }>({
    queryKey: CustomersQueryKeys.FETCH_ALL_CUSTOMERS,
    queryFn: fetchAllPriorities,
  });
};
