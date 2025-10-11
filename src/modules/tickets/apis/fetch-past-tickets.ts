import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from './apis';
import { ITicketDetails } from './ticket-type-apis/types';

export type PastTickets = Pick<
  ITicketDetails,
  | 'customerName'
  | 'ticketId'
  | 'source'
  | 'channelId'
  | 'ticketStatus'
  | 'priority'
  | 'tags'
  | 'createdAt'
  | 'createdFrom'
>;
export const usePastTickets = () => {
  const { ticketId } = useParams();
  const { getData } = useServiceClient();

  const getPastTicketsData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.PAST_TICKETS}?ticket_id=${ticketId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, ticketId]
  );

  return useQuery<{ data: PastTickets[] }, { message: string }>({
    queryKey: [TicketsQueryKey.PAST_TICKETS, ticketId],
    queryFn: getPastTicketsData,
  });
};
