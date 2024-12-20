import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import {
  AutoMationType,
  useDeleteAssignment,
} from 'modules/settings/apis/ticket-automation';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteAssignment = (props: {
  id: number;
  autoMationType: AutoMationType;
}) => {
  const { mutateAsync, isLoading } = useDeleteAssignment(props.autoMationType);
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
            message: t('assignments_delete_success'),
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: t('assignments_delete_error'),
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
        tooltipProps={{ title: t('delete_rule'), arrow: true }}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={t('delete_assignment_content')}
        title={t('delete_assignment_config')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
