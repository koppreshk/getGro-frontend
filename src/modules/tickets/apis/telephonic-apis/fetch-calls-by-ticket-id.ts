import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';

export interface ICallsByTicketId {
  calls: Call[];
}

export interface Call {
  duration: string;
  from: string;
  direction: string;
  to: string;
  agent_name: string;
  url: string;
  date: string;
}

export const useFetchCallsByTicketId = () => {
  const { ticketId } = useParams();
  const { getData } = useServiceClient();

  const getCallsData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_CALLS_BY_TICKETID}?ticket_id=${ticketId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, ticketId]
  );
  return useQuery<ICallsByTicketId, { message: string }>({
    queryKey: [TicketsQueryKey.FETCH_CALLS_BY_TICKETID, ticketId],
    queryFn: getCallsData,
  });
};
