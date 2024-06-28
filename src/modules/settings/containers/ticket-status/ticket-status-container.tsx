import { useFetchAllStatuses } from "modules/settings/apis/ticket-status";
import { TicketStatusLayout } from "../../component/ticket-configurations/ticket-status/ticket-status-layout";

export const TicketStatusContainer = () => {
    const { data, isLoading, error } = useFetchAllStatuses();

    if (data || isLoading) {
        return (
            <TicketStatusLayout data={data} isLoading={isLoading}/>
        )
    }
    return (
        <span>Error: {error as string}</span>
    )
}