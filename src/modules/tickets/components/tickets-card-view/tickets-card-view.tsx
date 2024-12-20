import { FlexBox, NoDataIllustration } from 'lib/ui-ux';
import { TicketsCardViewLoader } from 'lib/ui-ux/loader-components';

import { CardView } from './card-view';
import { ITicketDetails } from '../../apis';

interface ITicketCardViewProps {
  data: ITicketDetails[];
  isLoading?: boolean;
  totalPages: number;
}

export const TicketsCardview = (props: ITicketCardViewProps) => {
  const { data, isLoading } = props;

  if (isLoading) return <TicketsCardViewLoader />;

  return (
    <>
      {data.length > 0 ? (
        <FlexBox
          flexDirection="column"
          gap={'20px'}
          overflowY="auto"
          height="100%"
        >
          {data.map((item) => (
            <CardView {...item} key={item.ticketId} />
          ))}
        </FlexBox>
      ) : (
        <NoDataIllustration message="No tickets to display" />
      )}
    </>
  );
};
