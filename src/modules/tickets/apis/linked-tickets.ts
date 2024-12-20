import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from './api-enums';

export interface LinkedTickets {
  ticket_id: number;
  description: string;
  status: string;
}

export const useLinkedTickets = () => {
  const { ticketId } = useParams();
  const { getData } = useServiceClient();

  const getLinkedTicketsData = React.useCallback(
    () =>
      getData(`${TicketsEndPoint.LINKED_TICKETS}?ticket_id=${ticketId}`)
        .then((res) => res.json())
        .catch((err) => err),
    [getData, ticketId]
  );

  return useQuery<{ linked_tickets: LinkedTickets[] }>({
    queryKey: [TicketsQueryKey.LINKED_TICKETS, ticketId],
    queryFn: getLinkedTicketsData,
  });
};
