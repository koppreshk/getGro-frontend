import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteEmail } from 'modules/settings/apis';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteEmail = (props: { id: number }) => {
  const { mutateAsync, isLoading } = useDeleteEmail();
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
            message: t('email_delete_config_success'),
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: t('email_delete_config_error'),
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
        tooltipProps={{ title: t('delete_email'), arrow: true }}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={t('delete_email_config_content')}
        title={t('delete_email_config')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
