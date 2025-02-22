import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';

import { usePastTickets } from '../apis/fetch-past-tickets';
import { PastTicketsLayout } from '../components/ticket-details';

export const PastTicketsContainer = () => {
  const { isLoading, data, error } = usePastTickets();

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <>
        <PastTicketsLayout pastTickets={data.data} />
      </>
    );
  }

  return (
    <ErrorMessage statusCode={error?.message || 'An unknown error occurred'} />
  );
};
