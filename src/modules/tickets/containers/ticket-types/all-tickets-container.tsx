/* eslint-disable react/display-name */
import { useAppSelector } from 'lib/hooks';
import { useSocket, SocketEventKeys } from 'lib/providers/socket-provider';
import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllTickets } from 'modules/tickets/apis';
import {
  ITicketDetailsWithSearchQuey,
  useFetchALLTicketsWithSearchQuery,
} from 'modules/tickets/apis/ticket-type-apis/fetch-all-tickets-with-search-query';
import { TicketsByView } from 'modules/tickets/components';
import React, { useEffect } from 'react';

export const AllTicketsContainer = React.memo(() => {
  const { data, isLoading, error, refetch } = useFetchAllTickets();
  const isAdvanceFiltersEnabled = useAppSelector(
    (state) => state.tickets.isAdvanceFiltersEnabled
  );

  const [
    fetchAllTicketsWithSearchQuery,
    { isLoading: queryLoading, data: queryData, error: queryError },
  ] = useFetchALLTicketsWithSearchQuery();
  const { socket, getEventName } = useSocket();

  // Determine which data to use as ticketsData
  const ticketsData = isAdvanceFiltersEnabled
    ? (queryData as ITicketDetailsWithSearchQuey)?.data
    : data?.data;

  const totalTickets = isAdvanceFiltersEnabled
    ? ((queryData as ITicketDetailsWithSearchQuey)?.total_pages ?? 0)
    : (data?.total_pages ?? 0);

  useEffect(() => {
    socket?.on(getEventName(SocketEventKeys.EMAIL_LIST), () => {
      refetch();
    });
    return () => {
      socket.off(getEventName(SocketEventKeys.EMAIL_LIST));
    };
  }, [getEventName, refetch, socket]);

  if (queryError || error) {
    return (
      <ErrorMessage
        statusCode={(queryError as any)?.message || (error as any)?.message}
      />
    );
  }

  return (
    <TicketsByView
      isLoading={isLoading || queryLoading}
      data={ticketsData ?? []}
      totalPages={totalTickets}
      fetchAllTicketsWithSearchQuery={fetchAllTicketsWithSearchQuery}
    />
  );
});
