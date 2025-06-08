import { Delete } from '@mui/icons-material';
import { useNotifications } from 'lib';
import { CustomIconButton, NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteDepartment } from 'modules/settings/apis/department';
import { DeleteTagContent } from 'modules/settings/component/ticket-configurations';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteDepartmentContainer = (props: { id: number }) => {
  const { id } = props;
  const { mutateAsync, isLoading } = useDeleteDepartment();
  const { showNotification } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  const onDeleteHandler = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      mutateAsync({
        id: props.id,
      })
        .then(() =>
          showNotification({
            message: 'Department was deleted successfully',
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: 'Failed to delete the Department',
            type: 'error',
          })
        )
        .finally(() => toggleDeleteDialogBox());
    },
    [mutateAsync, props.id, showNotification]
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
        title="Delete Department"
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleteHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
