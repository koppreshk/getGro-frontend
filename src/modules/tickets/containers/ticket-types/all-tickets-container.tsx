/* eslint-disable react/display-name */
import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllTickets } from 'modules/tickets/apis';
import { TicketsByView } from 'modules/tickets/components';
import React from 'react';

export const AllTicketsContainer = React.memo(() => {
  const { data, isLoading, isFetching, error } = useFetchAllTickets();

  if (error) {
    return <ErrorMessage statusCode={(error as any)?.message} />;
  }

  return (
    <TicketsByView
      isLoading={isLoading || isFetching}
      data={data?.data ?? []}
      totalPages={data?.total_pages ?? 0}
    />
  );
});
