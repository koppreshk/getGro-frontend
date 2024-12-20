import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteQueue } from 'modules/settings/apis/queues';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IResult {
  status: boolean;
  message: string;
}

export const DeleteQueue = (props: { id: number }) => {
  const { mutateAsync, isLoading } = useDeleteQueue();
  const { showNotification } = useNotifications();

  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  const onDeleleHandler: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    mutateAsync({
      id: props.id,
    })
      .then((res: IResult) => {
        if (!res.status) {
          showNotification({ message: res.message, type: 'error' });
        } else {
          showNotification({
            message: t('delete_queue_success'),
            type: 'success',
          });
        }
      })
      .catch(() =>
        showNotification({ message: t('delete_queue_failed'), type: 'error' })
      );
  };

  return (
    <>
      <CustomIconButton
        onClick={toggleDeleteDialogBox}
        iconComponent={<Delete />}
        tooltipProps={{ title: t('delete_queue'), arrow: true }}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={t('confirm_queue_delete_message')}
        title={t('delete_queue')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
