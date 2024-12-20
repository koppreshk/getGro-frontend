import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteEscalation } from 'modules/settings/apis/ticket-automation/escalations';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteEscalation = (props: { id: number }) => {
  const { mutateAsync, isLoading } = useDeleteEscalation();
  const { showNotification } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  const onDeleleHandler = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      mutateAsync({
        id: props.id,
      })
        .then(() =>
          showNotification({
            message: t('delete_escalation_success'),
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: t('delete_escalation_error'),
            type: 'error',
          })
        )
        .finally(() => toggleDeleteDialogBox());
    },
    [mutateAsync, props.id, showNotification, t]
  );

  return (
    <>
      <CustomIconButton
        onClick={toggleDeleteDialogBox}
        iconComponent={<Delete />}
        tooltipProps={{ title: t('delete_escalation'), arrow: true }}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={t('delete_escalation_content')}
        title={t('delete_escalation')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
