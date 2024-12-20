import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteFacebookPage } from 'modules/settings/apis/marketplace/facebook/delete-facebook-page';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteFacebookPage = (props: { id: string }) => {
  const { mutateAsync, isLoading } = useDeleteFacebookPage();
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
            message: t('delete_fb_page_success'),
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: t('delete_fb_page_failure'),
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
        tooltipProps={{ title: t('delete_fb_page'), arrow: true }}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={t('delete_fb_dialog_content')}
        title={t('delete_fb_page')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
