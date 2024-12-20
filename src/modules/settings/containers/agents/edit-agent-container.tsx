import { useNotifications } from 'lib';
import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import {
  useEditUser,
  useFetchAllRoles,
  useFetchUserById,
} from 'modules/settings/apis/users-and-permissions';
import {
  AddAgentForm,
  IUserFormFields,
} from 'modules/settings/component/user-and-permissions';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IEditUserContainerProps {
  id: number;
  toggleUserDrawer: () => void;
}

export const EditAgentContainer = (props: IEditUserContainerProps) => {
  const { id, toggleUserDrawer } = props;
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useFetchAllRoles();
  const { data, isLoading, error } = useFetchUserById(id);
  const { mutateAsync, isLoading: mutationLoading } = useEditUser();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onEditUser = React.useCallback(
    (formData: IUserFormFields) => {
      mutateAsync({
        display_name: formData.displayName,
        email_address: formData.email,
        name: formData.name,
        phone_number: formData.phoneNumber,
        role_id: formData.role,
        id,
      })
        .then(() => {
          showNotification({
            message: t('edited_user_success'),
            type: 'success',
          });
          toggleUserDrawer();
        })
        .catch(() =>
          showNotification({ message: t('edited_user_failure'), type: 'error' })
        );
    },
    [id, mutateAsync, showNotification, t, toggleUserDrawer]
  );

  if (isLoading || rolesLoading) {
    return <CenteredCircularProgress />;
  }

  if (data && roles) {
    return (
      <AddAgentForm
        mode="edit"
        roles={roles}
        mutationLoading={mutationLoading}
        toggleUserDrawer={toggleUserDrawer}
        onFormSubmitHandler={onEditUser}
        defaultValues={{
          name: data.name,
          displayName: data?.display_name ?? '',
          role: data.role_id.toString(),
          userId: data.id,
          email: data.email,
          phoneNumber: data.phone_number,
        }}
      />
    );
  }
  return <ErrorMessage statusCode={error?.message || rolesError?.message} />;
};
