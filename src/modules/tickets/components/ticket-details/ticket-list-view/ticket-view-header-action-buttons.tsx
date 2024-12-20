import { PostAdd } from '@mui/icons-material';
import { useFeature } from 'lib/hooks';
import { CustomIconButton } from 'lib/ui-ux';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { AddTicket } from './add-ticket';

const StyledIconButtons = styled(CustomIconButton)`
  && {
    border: 1px solid;
    border-color: #dae2ed;
    border-radius: 12px;
  }
  & :hover {
    background-color: #fafafa;
  }
`;

export const TicketViewActionButtons = () => {
  const [openAddTicketDrawer, setOpenAddTicketDrawer] = React.useState(false);

  const toggleAddTicketDrawer = useCallback(() => {
    setOpenAddTicketDrawer((prevValue) => !prevValue);
  }, []);
  const showAddTicket = useFeature('add_ticket');

  return (
    <>
      {showAddTicket ? (
        <StyledIconButtons
          iconComponent={<PostAdd fontSize="small" />}
          size="small"
          color="primary"
          onClick={toggleAddTicketDrawer}
          tooltipProps={{ title: 'Add Ticket' }}
        />
      ) : null}
      <AddTicket
        openAddTicketDrawer={openAddTicketDrawer}
        toggleAddTicketDrawer={toggleAddTicketDrawer}
      />
    </>
  );
};
