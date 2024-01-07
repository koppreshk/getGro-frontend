import { useAuth } from "modules/login";

export enum Roles {
    Admin = 'Admin',
    Agent = 'Agent'
}

enum AccessRightKeys {
    ViewDashboard = 'ViewDashboard',
    ViewTickets = 'ViewTickets',
    ViewCustomers = 'ViewCustomers',
    ViewSettings = 'ViewSettings',
}

const accessRights = [
    {
        name: AccessRightKeys.ViewDashboard,
        mode: [Roles.Admin]
    },
    {
        name: AccessRightKeys.ViewCustomers,
        mode: [Roles.Admin]
    },
    {
        name: AccessRightKeys.ViewSettings,
        mode: [Roles.Admin]
    },
    {
        name: AccessRightKeys.ViewTickets,
        mode: [Roles.Admin, Roles.Agent]
    }
]

const useAutherization = () => {
    const { user } = useAuth();

    const authorize = (name: AccessRightKeys) => {
        let isAuthorized = false;
        accessRights.forEach((item) => {
            if (item.name === name) {
                isAuthorized = item.mode.includes(user!.role!);
            }
        })
        return isAuthorized;
    }

    return authorize;
}
export const usePermissions = () => {
    const authorize = useAutherization();

    return {
        isCustomersPageAccessible: authorize(AccessRightKeys.ViewCustomers),
        isDashboardPageAccessible: authorize(AccessRightKeys.ViewDashboard),
        isSettingsPageAccessible: authorize(AccessRightKeys.ViewSettings),
        isTicketsPageAccessible: authorize(AccessRightKeys.ViewTickets)
    }
}