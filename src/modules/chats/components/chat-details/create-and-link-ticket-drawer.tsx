import { DrawerExtended } from 'lib/ui-ux';
import { CreateAndLinkTicketContainer } from 'modules/chats/containers';
import { useTranslation } from 'react-i18next';

interface CreateAndLinkTicketDrawerProps {
  openAddTicketDrawer: boolean;
  toggleAddTicketDrawer: () => void;
}

export const CreateAndLinkTicketDrawer = (
  props: CreateAndLinkTicketDrawerProps
) => {
  const { openAddTicketDrawer, toggleAddTicketDrawer } = props;
  const { t } = useTranslation();

  return (
    <>
      <DrawerExtended
        anchor="right"
        header={t('create_and_link_ticket')}
        width="600px"
        open={openAddTicketDrawer}
        onRenderContent={() => (
          <CreateAndLinkTicketContainer
            toggleAddTicketDrawer={toggleAddTicketDrawer}
          />
        )}
        onClose={toggleAddTicketDrawer}
      />
    </>
  );
};
