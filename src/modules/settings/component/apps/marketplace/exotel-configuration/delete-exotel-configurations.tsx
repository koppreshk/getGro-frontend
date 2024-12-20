import { DeleteForever } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNotifications } from 'lib';
import { NegativeActionDialog } from 'lib/ui-ux';
import { useDeleteExotelConfiguration } from 'modules/settings/apis/marketplace/exotel';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeleteExotelConfigurations = () => {
  const { mutateAsync, isLoading } = useDeleteExotelConfiguration();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  const onDeleleHandler = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      mutateAsync()
        .then(() =>
          showNotification({
            message: 'Exotel Configuration uninstalled successfully',
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: 'Failed to uninstall Exotel Configuration',
            type: 'error',
          })
        )
        .finally(() => toggleDeleteDialogBox());
    },
    [mutateAsync, showNotification]
  );

  return (
    <>
      <Button
        variant="outlined"
        size="medium"
        onClick={toggleDeleteDialogBox}
        startIcon={<DeleteForever />}
      >
        Uninstall
      </Button>
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content="Do you want to uninstall this Exotel Configuration?"
        title="Uninstall Exotel Configuration"
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </>
  );
};
