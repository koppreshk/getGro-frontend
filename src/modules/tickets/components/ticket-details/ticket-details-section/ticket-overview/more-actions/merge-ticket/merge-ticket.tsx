import { DrawerExtended } from 'lib/ui-ux';
import { MergeTicketsContainer } from 'modules/tickets/containers/merge-tickets/merge-tickets-container';
import { useTranslation } from 'react-i18next';

interface MergeTicketProps {
  showMergeTicketDrawer: boolean;
  onCloseDrawer: () => void;
}

export const MergeTicket = (props: MergeTicketProps) => {
  const { onCloseDrawer, showMergeTicketDrawer } = props;
  const { t } = useTranslation();
  return (
    <DrawerExtended
      width="600px"
      header={t('merge_ticket')}
      anchor="right"
      open={showMergeTicketDrawer}
      onRenderContent={() => (
        <MergeTicketsContainer onCloseDrawer={onCloseDrawer} />
      )}
      onClose={onCloseDrawer}
    />
  );
};
