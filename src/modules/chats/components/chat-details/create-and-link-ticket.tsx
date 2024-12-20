import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { Trans } from 'react-i18next';

import { CreateAndLinkTicketDrawer } from './create-and-link-ticket-drawer';

export const CreateAndLinkTicket = () => {
  const [openAddTicketDrawer, setOpenAddTicketDrawer] = React.useState(false);

  const toggleAddTicketDrawer = useCallback(() => {
    setOpenAddTicketDrawer((prevValue) => !prevValue);
  }, []);

  return (
    <>
      <Button
        onClick={toggleAddTicketDrawer}
        variant="text"
        sx={{ height: '40px' }}
      >
        <Trans i18nKey="create_and_link_ticket" />
      </Button>
      <CreateAndLinkTicketDrawer
        openAddTicketDrawer={openAddTicketDrawer}
        toggleAddTicketDrawer={toggleAddTicketDrawer}
      />
    </>
  );
};
