import { useAppSelector } from 'lib/hooks';
import { FlexBox } from 'lib/ui-ux';
import {
  TicketOverviewContainer,
  PastTicketsContainer,
} from 'modules/tickets/containers';
import { TicketNotesContainer } from 'modules/tickets/containers/ticket-notes';
import React from 'react';
import { styled } from 'styled-components';

import { OrderDetailsLayout } from './order-details';
import { MenuOptions, TicketSideMenu } from './ticket-side-menu';

// import { TicketDispose } from "./dispose-ticket";

const StyledFlexBox = styled(FlexBox)`
  background-color: ${({ theme }) => theme.pallete.white};
`;

export const TicketDetailsSection = () => {
  const [selectedMenuOption, setSelectedMenuOption] = React.useState<string>(
    MenuOptions.CustomerProfile
  );
  const showHideTicketDetails = useAppSelector(
    (state) => state.tickets.showHideTicketDetails
  );
  const customerId = useAppSelector(
    (state) => state.tickets.ticketDetails?.shopifyCustomerId
  );

  const onMenuOptionClick = React.useCallback((id: string) => {
    setSelectedMenuOption(id);
  }, []);

  React.useEffect(() => {
    if (!customerId) {
      setSelectedMenuOption(MenuOptions.CustomerProfile);
    }
  }, [customerId]);

  const renderBasedOnSelectedview = React.useCallback(() => {
    switch (selectedMenuOption) {
      case MenuOptions.CustomerProfile:
        return <TicketOverviewContainer />;
      case MenuOptions.OrderDetails:
        return <OrderDetailsLayout customerId={customerId} />;
      case MenuOptions.Notes:
        return <TicketNotesContainer />;
      case MenuOptions.PastTickets:
        return <PastTicketsContainer />;
      default:
        return <span>default</span>;
    }
  }, [customerId, selectedMenuOption]);

  return (
    <StyledFlexBox width={'100%'} justifyContent={'flex-end'}>
      {showHideTicketDetails ? (
        <FlexBox width="calc(100% - 52px)" flexDirection="column" height="100%">
          {/* <div style={{ height: 'calc(100% - 47px)' }}> */}
          {renderBasedOnSelectedview()}
          {/* </div> */}
          {/* <TicketDispose /> */}
        </FlexBox>
      ) : null}
      <TicketSideMenu
        onSetMenuOption={onMenuOptionClick}
        selectedMenuOption={selectedMenuOption}
      />
    </StyledFlexBox>
  );
};
