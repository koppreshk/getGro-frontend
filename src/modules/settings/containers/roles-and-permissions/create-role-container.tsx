import { useNotifications } from "lib";
import { AllModules, AllPermissionKeys } from "lib/enums";
import { useAddRemoveRole } from "modules/settings/apis/users-and-permissions/roles-and-permissions"
import { CreateRole, ICreateRoleFormFields } from "modules/settings/component/user-and-permissions"
import { useNavigate } from "react-router-dom";

export const CreateRoleContainer = () => {
    const { mutateAsync } = useAddRemoveRole();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();

    const onSubmit = (formData: ICreateRoleFormFields) => {
        const { description, name, permissions, modules } = formData;
        const selectedPermissionKeys = Object.keys(permissions) as AllPermissionKeys[]
        const permissionsMod = selectedPermissionKeys.filter((item: AllPermissionKeys) => permissions[item]);

        const selectedModuleKeys = Object.keys(modules) as AllModules[];
        const modulesMod = selectedModuleKeys.filter((item) => modules[item]);

        mutateAsync({
            modules: modulesMod,
            permissions: permissionsMod,
            description: description,
            role: name
        }).then(() => {
            navigate(-1);
            showNotification({ message: `${name} role created successfully` })
        }).catch(() => showNotification({ message: 'Failed to create new role', type: 'error' }))
    }
    return <CreateRole onSubmit={onSubmit} />

} 