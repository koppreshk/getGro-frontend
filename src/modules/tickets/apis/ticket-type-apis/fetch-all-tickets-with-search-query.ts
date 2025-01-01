import useLazyQuery from 'lib/hooks/react-query-utils';

import { TicketsEndPoint } from '../api-enums';
import { ITicketDetails } from './types';

export interface ITicketDetailsWithSearchQuey {
  data: ITicketDetails[];
  total_pages: number;
}

export const useFetchALLTicketsWithSearchQuery = () => {
  return useLazyQuery<ITicketDetailsWithSearchQuey>({
    apiEndPoint: TicketsEndPoint.FETCH_ALL_TICKETS,
    queryKey: 'ALL_TICKETS_ADVANCED',
    queryOptions: {
      cacheTime: 0,
    },
  });
};
