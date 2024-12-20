import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from './api-enums';

export interface TicketsHistory {
  createdAt: string;
  description: string;
  userName: string;
  activityType: string;
  oldValue: string;
  newValue: string;
}

export const useTicketsHistory = () => {
  const { ticketId } = useParams();
  const { getData } = useServiceClient();

  const getTicketsHistoryData = React.useCallback(
    () =>
      getData(`${TicketsEndPoint.TICKET_HISTORY}?ticket_id=${ticketId}`)
        .then((res) => res.json())
        .catch((err) => err),
    [getData, ticketId]
  );

  return useQuery<TicketsHistory[]>({
    queryKey: [TicketsQueryKey.TICKET_HISTORY, ticketId],
    queryFn: getTicketsHistoryData,
  });
};
