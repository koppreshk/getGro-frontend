import { RolesAndPermissionsLayout } from "modules/settings/component/user-and-permissions/roles-and-permissions"

export interface IRolesAndPermissions {
    roleName: string;
    description: string;
    agents: number;
    roleType: string;
}

const rolesData: IRolesAndPermissions[] = [
    {
        agents: 1,
        description: "qweqwe qweqwe",
        roleName: "Admin",
        roleType: "System"
    },
    {
        agents: 2,
        description: "qweqwe qweqwe",
        roleName: "System Admin",
        roleType: "System"
    }
]

export const RolesAndPermissionsContainer = () => {

    return (
        <RolesAndPermissionsLayout rolesData={rolesData || []} />
    )
}  