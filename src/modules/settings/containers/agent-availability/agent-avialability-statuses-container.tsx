import { AgentStatusesList, IStatusesList } from "modules/settings/component/general/agent-availability/agent-statuses-list"

const statuses = [{
    color: '#ff7a1a',
    enable: true,
    statusCategory: 'Away',
    statusName: 'Away'
}, {
    color: '#1aaa55',
    enable: true,
    statusCategory: 'Online',
    statusName: 'Online'
}, {
    color: '#a0aec0',
    enable: true,
    statusCategory: 'Offline',
    statusName: 'Offline'
}, {
    color: '#ff9800',
    enable: true,
    statusCategory: 'Be right back',
    statusName: 'Be right back'
}] as IStatusesList[];

export const AgentAvailabilityStatusesContainer = () => {
    return (
        <>
            <AgentStatusesList statuses={statuses} />
        </>
    )
}