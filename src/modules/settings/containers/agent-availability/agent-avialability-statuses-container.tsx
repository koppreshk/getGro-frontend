import { useFetchAvailabilityStatuses } from "modules/settings/apis/users-and-permissions";
import { AgentStatusesList } from "modules/settings/component/user-and-permissions/agent-availability/agent-statuses-list"

export const AgentAvailabilityStatusesContainer = () => {
    const { data, isLoading } = useFetchAvailabilityStatuses()
    return (
        <>
            <AgentStatusesList statuses={data} isLoading={isLoading} />
        </>
    )
}