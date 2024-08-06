import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchAllRoles } from "modules/settings/apis/users-and-permissions";
import { RolesAndPermissionsLayout } from "modules/settings/component/user-and-permissions/roles-and-permissions"

export interface IRolesAndPermissions {
    roleName: string;
    description: string;
    agents: number;
    roleType: string;
}

export const RolesAndPermissionsContainer = () => {

    const { data, isLoading } = useFetchAllRoles();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <RolesAndPermissionsLayout rolesData={data || []} />
    }

    return <ErrorMessage />
}  