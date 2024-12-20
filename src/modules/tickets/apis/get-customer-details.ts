import useLazyQuery from 'lib/hooks/react-query-utils';

import { TicketsEndPoint, TicketsQueryKey } from './api-enums';

export interface ICustomerDetails {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export const useGetCustomerDetails = () => {
  return useLazyQuery<ICustomerDetails[]>({
    apiEndPoint: TicketsEndPoint.GET_CUSTOMER_DETAILS,
    queryKey: TicketsQueryKey.GET_CUSTOMER_DETAILS,
  });
};
