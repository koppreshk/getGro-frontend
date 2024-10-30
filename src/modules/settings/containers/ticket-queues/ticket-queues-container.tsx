import { TicketQueue } from "modules/settings/component/user-and-permissions/ticket-queue";
import { useFetchAllTicketQueues } from "../../apis/queues";
import { ErrorMessage } from "lib/ui-ux";

export default function TicketQueuesContainer() {
    const { data, isLoading, isFetching, error } = useFetchAllTicketQueues();

    if (data || isLoading) {
        return (
            <TicketQueue isLoading={isLoading || isFetching} data={data || { employees: [], queues: [], total_pages: 0 }} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}