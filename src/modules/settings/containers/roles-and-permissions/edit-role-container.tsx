import { useNotifications } from 'lib';
import { AllModules, AllPermissionKeys, ModuleKeys } from 'lib/enums';
import { IRoles } from 'modules/settings/apis/users-and-permissions';
import { useAddRemoveRole } from 'modules/settings/apis/users-and-permissions/roles-and-permissions';
import {
  CreateRole,
  ICreateRoleFormFields,
} from 'modules/settings/component/user-and-permissions';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface EditRoleContainerProps {
  rolesData: IRoles[];
}

export const EditRoleContainer = (props: EditRoleContainerProps) => {
  const { rolesData } = props;
  const [searchParams] = useSearchParams();
  const roleId = searchParams.get('roleId')!;

  const { mutateAsync, isLoading } = useAddRemoveRole();
  const navigate = useNavigate();
  const { showNotification } = useNotifications();

  const onSubmit = (formData: ICreateRoleFormFields) => {
    const { description, name, permissions, modules } = formData;
    const selectedPermissionKeys = Object.keys(
      permissions
    ) as AllPermissionKeys[];
    const permissionsMod = selectedPermissionKeys.filter(
      (item: AllPermissionKeys) => permissions[item]
    );

    const selectedModuleKeys = Object.keys(modules) as AllModules[];
    const modulesMod = selectedModuleKeys.filter((item) => modules[item]);

    mutateAsync({
      modules: modulesMod,
      permissions: permissionsMod,
      description: description,
      role: name,
      role_id: roleId,
    })
      .then(() => {
        navigate(-1);
        showNotification({ message: `${name} role edited successfully` });
      })
      .catch(() =>
        showNotification({ message: 'Failed to edit the role', type: 'error' })
      );
  };

  const selectedRole = rolesData.find((item) => item.id.toString() === roleId)!;
  const defaultValues = {
    description: selectedRole.description,
    modules: selectedRole.modules.reduce(
      (acc, curr) => {
        acc[curr as AllModules] = true;
        return acc;
      },
      { tickets: true } as {
        [key in ModuleKeys]: boolean;
      }
    ),
    name: selectedRole.name,
    permissions: selectedRole.permissions.reduce(
      (acc, curr) => {
        acc[curr] = true;
        return acc;
      },
      {} as {
        [key in AllPermissionKeys]: boolean;
      }
    ),
  };

  return (
    <CreateRole
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      mutationLoading={isLoading}
    />
  );
};
