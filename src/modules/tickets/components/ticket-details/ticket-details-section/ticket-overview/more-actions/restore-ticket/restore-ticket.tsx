import { useNotifications } from 'lib';
import { NegativeActionDialog } from 'lib/ui-ux';
import { useRestoreTicket } from 'modules/tickets/apis/restore-ticket';
import { useTranslation } from 'react-i18next';

interface MergeTicketProps {
  showDialog: boolean;
  ticketId: string | number;
  onCloseDrawer: () => void;
}

export const RestoreTicket = (props: MergeTicketProps) => {
  const { onCloseDrawer, showDialog, ticketId } = props;
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useRestoreTicket();
  const { showNotification } = useNotifications();

  const onDelete = () => {
    mutateAsync({
      ticket_id: ticketId,
    })
      .then(() => {
        onCloseDrawer();
        showNotification({
          message: t('ticket_restore_success'),
          type: 'success',
        });
      })
      .catch(() =>
        showNotification({ message: t('ticket_restore_eroor'), type: 'error' })
      );
  };

  return (
    <>
      <NegativeActionDialog
        open={showDialog}
        isLoading={isLoading}
        content={
          'This will restore the ticket. Are you sure you want to restore this ticket?'
        }
        title={t('restore_ticket')}
        negativeActionLabel={t('yes_restore')}
        onNegativeActionClick={onDelete}
        onClose={onCloseDrawer}
      />
    </>
  );
};
