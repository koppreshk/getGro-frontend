import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

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
    () =>
      getData(
        `${TicketsEndPoint.FETCH_CALLS_BY_TICKETID}?ticket_id=${ticketId}`
      )
        .then((res) => res.json())
        .catch((err) => err),
    [getData, ticketId]
  );
  return useQuery<ICallsByTicketId>({
    queryKey: [TicketsQueryKey.FETCH_CALLS_BY_TICKETID, ticketId],
    queryFn: getCallsData,
  });
};
