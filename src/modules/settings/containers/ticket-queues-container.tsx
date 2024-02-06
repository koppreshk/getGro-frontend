import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "../apis/queues";
import { TicketQueue } from "../component";

export const TicketQueuesContainer = () => {
    const { data, isLoading, error } = useFetchAllTicketQueues();

    if (isLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (data) {
        return (
            <TicketQueue data={data} />
        )
    }

    return <span>Error: {error as string}</span>
}