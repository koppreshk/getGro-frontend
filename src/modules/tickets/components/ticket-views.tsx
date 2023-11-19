import { ModuleSubMenu } from "modules/core";

const viewOptions = [
    {
        name: 'Unassigned',
        primaryKey: 'unassigned',
        route: 'unassigned'
    },
    {
        name: 'All Pending',
        primaryKey: 'all-pending',
        route: 'all-pending'
    },
    {
        name: 'All Complete',
        primaryKey: 'all-complete',
        route: 'all-complete'
    },
    {
        name: 'All Junk',
        primaryKey: 'all-junk',
        route: 'all-junk'
    },
    {
        name: 'Assigned To Me',
        primaryKey: 'assigned-to-me',
        route: 'assigned-to-me'
    },
    {
        name: 'Created By Me',
        primaryKey: 'created-by-me',
        route: 'created-by-me'
    },
    {
        name: 'Completed By Me',
        primaryKey: 'completed-by-me',
        route: 'completed-by-me'
    },
    {
        name: 'Completed By Team',
        primaryKey: 'completed-by-team',
        route: 'completed-by-team'
    },
    {
        name: 'Pending By Team',
        primaryKey: 'pending-by-team',
        route: 'pending-by-team'
    },
]

export const TicketViews = () => {
    return (
        <ModuleSubMenu subMenuOptions={viewOptions} />
    )
};
