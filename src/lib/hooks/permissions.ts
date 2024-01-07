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

export enum TicketAccessRights {
    Unassigned = 'unassigned',
    AllPending = 'all-pending',
    AllComplete = 'all-complete',
    AllJunk = 'all-junk',
    AssignedToMe = 'assigned-to-me',
    CreatedByMe = 'created-by-me',
    CompletedByMe = 'completed-by-me',
    CompletedByTeam = 'completed-by-team',
    PendingByTeam = 'pending-by-team',
}

type IAccessRights = {
    name: AccessRightKeys | TicketAccessRights;
    mode: Roles[];
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
        mode: [Roles.Admin, Roles.Agent],
    },
    {
        name: TicketAccessRights.Unassigned,
        mode: [Roles.Admin],
    },
    {
        name: TicketAccessRights.AllPending,
        mode: [Roles.Admin],
    },
    {
        name: TicketAccessRights.AllComplete,
        mode: [Roles.Admin],
    },
    {
        name: TicketAccessRights.AllJunk,
        mode: [Roles.Admin],
    },
    {
        name: TicketAccessRights.AssignedToMe,
        mode: [Roles.Admin, Roles.Agent],
    },
    {
        name: TicketAccessRights.CreatedByMe,
        mode: [Roles.Admin, Roles.Agent],
    },
    {
        name: TicketAccessRights.CompletedByMe,
        mode: [Roles.Admin, Roles.Agent],
    },
    {
        name: TicketAccessRights.CompletedByTeam,
        mode: [Roles.Admin],
    },
    {
        name: TicketAccessRights.PendingByTeam,
        mode: [Roles.Admin],
    },
] as IAccessRights[]

export const useAutherization = () => {
    const { user } = useAuth();

    const authorize = (name: AccessRightKeys | TicketAccessRights) => {
        let isAuthorized = false;
        accessRights.forEach((item) => {
            if (item.name === name) {
                isAuthorized = item.mode.includes(user!.role!);
                return;
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