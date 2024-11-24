import { useSearchParams } from "react-router-dom";
import { AllModules, AllPermissionKeys, ChatPermissionKeys, ConfigurationPermissionKeys, DashboardPermissionKeys, KnowledgeBasePermissionKeys, ModuleKeys, TicketPermissionKeys } from "lib/enums";
import { CreateRole } from "modules/settings/component/user-and-permissions"
import { IRoles } from "modules/settings/apis/users-and-permissions";

interface ViewRoleContainerProps {
    rolesData: IRoles[];
}

export const ViewRoleContainer = (props: ViewRoleContainerProps) => {
    const { rolesData } = props;
    const [searchParams] = useSearchParams();
    const roleId = searchParams.get('roleId')!;

    const selectedRole = rolesData.find((item) => item.id.toString() === roleId)!;

    //Showing all permissions for mode view as it will be only for account owner 
    const allTicketPermissions = Object.values(TicketPermissionKeys);
    const allChatPermissions = Object.values(ChatPermissionKeys);
    const allConfigPermissions = Object.values(ConfigurationPermissionKeys);
    const allDashboardPermissions = Object.values(DashboardPermissionKeys);
    const allKnowledgeBasePermissions = Object.values(KnowledgeBasePermissionKeys);
    const allPermissions = [...allTicketPermissions,  ...allChatPermissions, ...allConfigPermissions, ...allDashboardPermissions, ...allKnowledgeBasePermissions] as AllPermissionKeys[];

    const defaultValues = {
        description: selectedRole.description,
        modules: Object.values(ModuleKeys).reduce((acc, curr) => {
            acc[curr as AllModules] = true;
            return acc;
        }, { tickets: true } as {
            [key in ModuleKeys]: boolean;
        }),
        name: selectedRole.name,
        permissions: allPermissions.reduce((acc, curr) => {
            acc[curr] = true;
            return acc;
        }, {} as {
            [key in AllPermissionKeys]: boolean;
        })
    };

    return (
        <CreateRole defaultValues={defaultValues} mode="view" />
    )

} 