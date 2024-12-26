import { useNotifications } from 'lib';
import { NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteTicket } from 'modules/tickets/apis';
import { useTranslation } from 'react-i18next';

import { DeleteTicketContent } from './delete-ticket-content';

interface MergeTicketProps {
  showDialog: boolean;
  ticketId: string | number;
  onCloseDrawer: () => void;
}

export const DeleteTicket = (props: MergeTicketProps) => {
  const { onCloseDrawer, showDialog, ticketId } = props;
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useDeleteTicket();
  const { showNotification } = useNotifications();

  const onDelete = () => {
    mutateAsync({
      ticket_id: ticketId,
    })
      .then(() => {
        onCloseDrawer();
        showNotification({
          message: t('ticket_delete_success'),
          type: 'success',
        });
      })
      .catch(() =>
        showNotification({ message: t('ticket_delete_eroor'), type: 'error' })
      );
  };

  return (
    <>
      <NegativeActionDialog
        open={showDialog}
        isLoading={isLoading}
        content={<DeleteTicketContent />}
        title={t('delete_ticket')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDelete}
        onClose={onCloseDrawer}
      />
    </>
  );
};
