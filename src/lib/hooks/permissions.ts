import { useAuth } from "modules/login";

export enum Roles {
    Agent = 'Agent',
    AccountOwner = 'Account Owner'
}

enum AccessRightKeys {
    ViewDashboard = 'ViewDashboard',
    ViewTickets = 'ViewTickets',
    ViewCustomers = 'ViewCustomers',
    ViewSettings = 'ViewSettings',
}

export enum TicketAccessRights {
    AllTickets = 'all-tickets',
    AllPending = 'all-pending',
    AllResolved = 'all-resolved',
    AllClosed = 'all-closed',
    MyPending = 'my-pending',
    MyResolved = 'my-resolved',
    MyClosed = 'my-closed',
}

type IAccessRights = {
    name: AccessRightKeys | TicketAccessRights;
    mode: Roles[];
}

const accessRights = [
    {
        name: AccessRightKeys.ViewDashboard,
        mode: [Roles.AccountOwner]
    },
    {
        name: AccessRightKeys.ViewCustomers,
        mode: [Roles.AccountOwner]
    },
    {
        name: AccessRightKeys.ViewSettings,
        mode: [Roles.AccountOwner]
    },
    {
        name: AccessRightKeys.ViewTickets,
        mode: [Roles.Agent, Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.AllTickets,
        mode: [Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.AllPending,
        mode: [Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.AllResolved,
        mode: [Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.AllClosed,
        mode: [Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.MyPending,
        mode: [Roles.Agent, Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.MyResolved,
        mode: [Roles.Agent, Roles.AccountOwner],
    },
    {
        name: TicketAccessRights.MyClosed,
        mode: [Roles.Agent, Roles.AccountOwner],
    }
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
