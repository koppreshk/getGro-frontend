import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteCannedResponse } from 'modules/settings/apis/canned-response';
import { DeleteTagContent } from 'modules/settings/component/ticket-configurations';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteCannedResponseContainer = (props: { id: number }) => {
  const { id } = props;
  const { mutateAsync, isLoading } = useDeleteCannedResponse();
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
            message: t('canned_response_delete_successfull'),
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: t('canned_response_delete_failure'),
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
        iconComponent={<Delete />}
        tooltipProps={{ title: t('delete') }}
        key={id}
        onClick={toggleDeleteDialogBox}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={<DeleteTagContent />}
        title="Delete Tag"
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
