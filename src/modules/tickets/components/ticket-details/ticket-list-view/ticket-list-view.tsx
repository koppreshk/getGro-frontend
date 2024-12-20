import { FlexBox } from 'lib/ui-ux';
import { ITicketDetails } from 'modules/tickets/apis';

import { TicketList, TicketListViewHeader } from '.';

interface ITicketListViewsProps {
  data: ITicketDetails[];
  isLoading?: boolean;
}

export const TicketListView = (props: ITicketListViewsProps) => {
  const { data } = props;

  return (
    <FlexBox
      flexDirection="column"
      width="100%"
      style={{ backgroundColor: '#fff' }}
    >
      <TicketListViewHeader />
      <TicketList data={data} />
    </FlexBox>
  );
};
