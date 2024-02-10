import { useFetchAllTicketQueues } from "../../apis/queues";
import { TicketQueue } from "../../component";

export const TicketQueuesContainer = () => {
    const { data, isLoading, error } = useFetchAllTicketQueues();

    if (data || isLoading) {
        return (
            <TicketQueue isLoading={isLoading} data={data || { employees: [], queues: [], total_pages: 0 }} />
        )
    }

    return <span>Error: {error as string}</span>
}