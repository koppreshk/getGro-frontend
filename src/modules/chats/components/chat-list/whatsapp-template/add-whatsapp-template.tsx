import { WhatsApp } from '@mui/icons-material';
import { CustomIconButton } from 'lib/ui-ux';
import React, { useCallback } from 'react';
import { styled } from 'styled-components';

import { AddWhatsappTemplateForm } from './add-whatsapp-template-form';

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

export const AddWhatsappTemplate = () => {
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
        tooltipProps={{ title: 'Whatsapp Template Form' }}
      />
      <AddWhatsappTemplateForm
        openAddWhatsappChatFormDrawer={openAddTicketDrawer}
        toggleAddWhatsappChatFormDrawer={toggleAddTicketDrawer}
      />
    </>
  );
};
