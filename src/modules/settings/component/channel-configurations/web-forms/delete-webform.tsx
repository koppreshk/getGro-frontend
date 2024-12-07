import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteWebForm } from 'modules/settings/apis/channel-configurations/webforms';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IResult {
  status: boolean;
  message: string;
}

export const DeleteWebForm = (props: { id: number }) => {
  const { mutateAsync, isLoading } = useDeleteWebForm();
  const { showNotification } = useNotifications();

  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  const onDeleleHandler: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    mutateAsync({
      form_id: props.id,
    })
      .then((res: IResult) => {
        if (!res.status) {
          showNotification({ message: res.message, type: 'error' });
        } else {
          showNotification({
            message: t('delete_webform_success'),
            type: 'success',
          });
        }
      })
      .catch(() =>
        showNotification({ message: t('delete_webform_failed'), type: 'error' })
      );
  };

  return (
    <>
      <CustomIconButton
        onClick={toggleDeleteDialogBox}
        iconComponent={<Delete />}
        tooltipProps={{ title: t('delete_webform'), arrow: true }}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={t('confirm_webform_delete_message')}
        title={t('delete_webform')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
