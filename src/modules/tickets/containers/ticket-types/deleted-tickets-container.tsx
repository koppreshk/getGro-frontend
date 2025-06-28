import { ErrorMessage } from 'lib/ui-ux';
import { useFetchDeletedTickets } from 'modules/tickets/apis/ticket-type-apis/fetch-deleted-tickets';
import { TicketsByView } from 'modules/tickets/components';
import React from 'react';

export const DeletedTicketsContainer = React.memo(() => {
  const { data, isLoading, isFetching, error } = useFetchDeletedTickets();

  if (data || isLoading) {
    const ticketsData = data?.data ?? [];
    const totalTickets = data?.total_pages ?? 0;

    return (
      <TicketsByView
        isLoading={isLoading || isFetching}
        data={ticketsData}
        totalPages={totalTickets}
      />
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
});

DeletedTicketsContainer.displayName = 'DeletedTicketsContainer';
