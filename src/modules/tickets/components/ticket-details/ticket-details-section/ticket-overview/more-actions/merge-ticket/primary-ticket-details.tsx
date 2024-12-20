import { FlexBox, HorizontalSeparator } from 'lib/ui-ux';
import { ISearchTickets, ITicketDetails } from 'modules/tickets/apis';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { IMergeTicketsFormFields } from './merge-tickets-content';
import { SearchTickets } from './search-ticket';
import { TicketInfo } from './ticket-info';

export interface IPrimaryTicketDetailsProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  data: ISearchTickets | undefined;
  isLoading: boolean;
  ticketDetails: Pick<
    ITicketDetails,
    'description' | 'ticketStatus' | 'customerName' | 'ticketId'
  >;
}

const StyledTicketInfo = styled(TicketInfo)`
  background: ${({ theme }) => theme.pallete.grayVariant5};
  border-radius: 4px;
`;

export const PrimaryTicketDetails = (props: IPrimaryTicketDetailsProps) => {
  const { data, isLoading, onChange, ticketDetails } = props;
  const { watch } = useFormContext<IMergeTicketsFormFields>();
  const selectedTickets = watch('searchTickets');

  return (
    <FlexBox padding="20px" flexDirection="column" gap={'20px'}>
      <StyledTicketInfo ticketDetails={ticketDetails} isPrimary />
      <HorizontalSeparator />
      <SearchTickets data={data} isLoading={isLoading} onChange={onChange} />
      {selectedTickets ? (
        <FlexBox flexDirection="column" gap={'10px'}>
          {selectedTickets.map((item) => (
            <StyledTicketInfo ticketDetails={item} key={item.ticketId} />
          ))}
        </FlexBox>
      ) : null}
    </FlexBox>
  );
};
