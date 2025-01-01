import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { Trans } from 'react-i18next';

import { LinkTicketDialog } from './link-ticket-dialog';

export const LinkTicket = () => {
  const [openLinkTicketDialog, setOpenLinkTicketDialog] = React.useState(false);

  const toggleLinkTicketDialog = useCallback(() => {
    setOpenLinkTicketDialog((prevValue) => !prevValue);
  }, []);

  return (
    <>
      <Button
        onClick={toggleLinkTicketDialog}
        variant="text"
        sx={{ height: '40px' }}
      >
        <Trans i18nKey="link_tickets" />
      </Button>
      <LinkTicketDialog
        openLinkTicketDialog={openLinkTicketDialog}
        toggleLinkTicketDialog={toggleLinkTicketDialog}
      />
    </>
  );
};
