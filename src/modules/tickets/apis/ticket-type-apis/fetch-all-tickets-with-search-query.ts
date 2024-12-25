import useLazyQuery from 'lib/hooks/react-query-utils';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';
import { ITicketDetails } from './types';

export interface ITicketDetailsWithSearchQuey {
  data: ITicketDetails[];
  total_pages: number;
}

export const useFetchALLTicketsWithSearchuery = () => {
  return useLazyQuery<ITicketDetailsWithSearchQuey>({
    apiEndPoint: TicketsEndPoint.FETCH_ALL_TICKETS,
    queryKey: TicketsQueryKey.FETCH_ALL_TICKETS,
    queryOptions: {
      cacheTime: 0,
    },
  });
};
