import { ErrorMessage } from 'lib/ui-ux';
import { useFetchAllRoles } from 'modules/settings/apis/users-and-permissions';
import { RolesAndPermissionsLayout } from 'modules/settings/component/user-and-permissions/roles-and-permissions';

export interface IRolesAndPermissions {
  roleName: string;
  description: string;
  agents: number;
  roleType: string;
}

export default function RolesAndPermissionsContainer() {
  const { data, isLoading, isFetching } = useFetchAllRoles();

  if (data || isLoading) {
    return (
      <RolesAndPermissionsLayout
        rolesData={data || []}
        isLoading={isLoading || isFetching}
      />
    );
  }

  return <ErrorMessage />;
}
