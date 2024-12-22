import { useAppSelector } from 'lib/hooks';
import { CenteredCircularProgress } from 'lib/ui-ux';
import { toCamelCasedKeysFromUnderScores } from 'lib/utils';
import { INotes, useFetchAllNotes } from 'modules/tickets/apis';
import { TicketNotes } from 'modules/tickets/components/ticket-details/ticket-details-section/ticket-notes/ticket-notes';

export const TicketNotesContainer = () => {
  const ticketId = useAppSelector(
    (state) => state.tickets.ticketDetails?.ticketId
  );
  const { data, isLoading, error } = useFetchAllNotes(ticketId!);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    const notes = data.map((item) =>
      toCamelCasedKeysFromUnderScores(item)
    ) as INotes[];
    return (
      <>
        <TicketNotes notes={notes} ticketId={ticketId!} />
      </>
    );
  }

  return <span>Error: {error as string}</span>;
};
