import { useAppSelector } from 'lib/hooks';
import { FlexBox, NoDataIllustration } from 'lib/ui-ux';
import { TicketsCardViewLoader } from 'lib/ui-ux/loader-components';

import { CardView } from './card-view';

interface ITicketCardViewProps {
  isLoading?: boolean;
  totalPages: number;
}

export const TicketsCardview = (props: ITicketCardViewProps) => {
  const { isLoading } = props;
  const ticketsList = useAppSelector((state) => state.tickets.ticketsList);

  if (isLoading) return <TicketsCardViewLoader />;

  return (
    <>
      {ticketsList.length > 0 ? (
        <FlexBox
          flexDirection="column"
          gap={'20px'}
          overflowY="auto"
          height="100%"
        >
          {ticketsList.map((item) => (
            <CardView {...item} key={item.ticketId} />
          ))}
        </FlexBox>
      ) : (
        <NoDataIllustration message="No tickets to display" />
      )}
    </>
  );
};
