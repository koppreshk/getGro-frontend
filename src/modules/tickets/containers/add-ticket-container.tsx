import { CenteredCircularProgress } from "lib/ui-ux";
import { AddTicketForm } from "../components/ticket-details/ticket-list-view/add-ticket-form";
import { useFetchAllChannels } from "modules/settings/apis/tags";
import { useFetchAllTicketQueues } from "modules/settings/apis";

export const AddTicketContainer = () => {
    const { data, isLoading } = useFetchAllChannels();
    const { data: queueData, isLoading: queueDataLoading, error } = useFetchAllTicketQueues();

    if (isLoading || queueDataLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (data && queueData) {
        return (
            <AddTicketForm queueData={queueData?.queues} channelData={data} />
        )
    }

    return <span>Error {error as any}</span>
}