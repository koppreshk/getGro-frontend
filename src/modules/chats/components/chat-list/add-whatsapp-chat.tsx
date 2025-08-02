import { WhatsApp } from '@mui/icons-material';
import { CustomIconButton } from 'lib/ui-ux';
import React, { useCallback } from 'react';
import { styled } from 'styled-components';

import { AddWhatsappChatForm } from './add-whatsapp-chat-form';

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

export const AddWhatsappChat = () => {
  const [openAddTicketDrawer, setOpenAddTicketDrawer] = React.useState(false);

  const toggleAddTicketDrawer = useCallback(() => {
    setOpenAddTicketDrawer((prevValue) => !prevValue);
  }, []);

  return (
    <>
      <StyledIconButtons
        iconComponent={<WhatsApp fontSize="small" />}
        size="small"
        color="primary"
        onClick={toggleAddTicketDrawer}
        tooltipProps={{ title: 'Add Whatsapp Chat' }}
      />
      <AddWhatsappChatForm
        openAddWhatsappChatFormDrawer={openAddTicketDrawer}
        toggleAddWhatsappChatFormDrawer={toggleAddTicketDrawer}
      />
    </>
  );
};
