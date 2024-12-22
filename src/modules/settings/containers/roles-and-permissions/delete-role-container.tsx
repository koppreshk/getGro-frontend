import { Delete } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNotifications } from 'lib';
import { SelectField } from 'lib/form-fields';
import { CustomIconButton, FlexBox, NegativeActionDialog } from 'lib/ui-ux';
import { IRoles } from 'modules/settings/apis/users-and-permissions';
import { useDeleteRole } from 'modules/settings/apis/users-and-permissions/roles-and-permissions';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const DeleteRolesContainer = (props: {
  roleId: number;
  rolesData: IRoles[];
}) => {
  const { roleId, rolesData } = props;
  const { mutateAsync, isLoading } = useDeleteRole();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const [open, setOpen] = React.useState(false);
  const methods = useForm();
  const toggleDeleteDialogBox = () => {
    setOpen((prev) => !prev);
  };

  const onDeleleHandler = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      ev.stopPropagation();
      methods.trigger().then((res) => {
        if (res) {
          mutateAsync({
            role_id: props.roleId,
            new_role_id: methods.watch('role'),
          })
            .then(() =>
              showNotification({
                message: t('role_delete_success'),
                type: 'success',
              })
            )
            .catch(() =>
              showNotification({
                message: t('role_delete_failure'),
                type: 'error',
              })
            )
            .finally(() => toggleDeleteDialogBox());
        }
      });
    },
    [methods, mutateAsync, props.roleId, showNotification, t]
  );

  return (
    <FormProvider {...methods}>
      <CustomIconButton
        iconComponent={<Delete />}
        tooltipProps={{ title: t('delete') }}
        key={roleId}
        onClick={toggleDeleteDialogBox}
      />
      <NegativeActionDialog
        open={open}
        isLoading={isLoading}
        content={
          <FlexBox gap={'30px'} flexDirection="column">
            <Typography variant="body2">{t('delete_role_content')}</Typography>
            <SelectField
              sx={{ width: '100%' }}
              name="role"
              label={t('role')}
              menuOptions={
                rolesData
                  .filter((it) => it.id !== props.roleId)
                  .map((item) => ({
                    key: item.id.toString(),
                    value: item.name,
                  })) || []
              }
              fullWidth
              rules={{ required: t('delete_role_validation') }}
            />
          </FlexBox>
        }
        title={t('delete_role')}
        negativeActionLabel={t('yes_delete')}
        onNegativeActionClick={onDeleleHandler}
        onClose={toggleDeleteDialogBox}
      />
    </FormProvider>
  );
};
