import { useAppSelector } from 'lib/hooks';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';

import { PastTicketsLayout } from '../components/ticket-details';

export const PastTicketsContainer = () => {
  const ticketDetails = useAppSelector((state) => state.tickets.ticketDetails);

  if (ticketDetails === undefined) {
    return <CenteredCircularProgress />;
  }

  if (ticketDetails) {
    return (
      <>
        <PastTicketsLayout pastTickets={ticketDetails.pastTickets} />
      </>
    );
  }

  return <ErrorMessage />;
};
