import { Statuses } from "modules/core/components/parts/agent-status";
import { AgentStatusesList, IStatusesList } from "modules/settings/component/user-and-permissions/agent-availability/agent-statuses-list"

const statuses = [{
    color: '#ffef0e',
    enable: true,
    statusCategory: Statuses.Away,
    statusName: Statuses.Away
}, {
    color: '#17e254',
    enable: true,
    statusCategory: Statuses.Active,
    statusName: Statuses.Active
}, {
    color: '#ec3427',
    enable: true,
    statusCategory: Statuses.Busy,
    statusName: Statuses.Busy
}, {
    color: '#c9c2c2',
    enable: true,
    statusCategory: Statuses.Offline,
    statusName: Statuses.Offline
}, {
    color: '#d80e00',
    enable: false,
    statusCategory: Statuses.DoNotDisturb,
    statusName: Statuses.DoNotDisturb
}] as IStatusesList[];

export const AgentAvailabilityStatusesContainer = () => {
    return (
        <>
            <AgentStatusesList statuses={statuses} />
        </>
    )
}