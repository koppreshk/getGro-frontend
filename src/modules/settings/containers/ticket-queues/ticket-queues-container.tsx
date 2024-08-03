import { TicketQueue } from "modules/settings/component/user-and-permissions/ticket-queue";
import { useFetchAllTicketQueues } from "../../apis/queues";

export const TicketQueuesContainer = () => {
    const { data, isLoading, error } = useFetchAllTicketQueues();

    if (data || isLoading) {
        return (
            <TicketQueue isLoading={isLoading} data={data || { employees: [], queues: [], total_pages: 0 }} />
        )
    }

    return <span>Error: {error as string}</span>
}