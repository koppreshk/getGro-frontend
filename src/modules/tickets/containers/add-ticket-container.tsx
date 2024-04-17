import { CenteredCircularProgress } from "lib/ui-ux";
import { AddTicketForm } from "../components/ticket-details/ticket-list-view/add-ticket-form";
import { useFetchAllChannels } from "modules/settings/apis/tags";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { useFetchPriorities } from "../apis";

export const AddTicketContainer = (props: { toggleAddTicketDrawer: () => void }) => {
    const { data, isLoading } = useFetchAllChannels();
    const { data: queueData, isLoading: queueDataLoading, error } = useFetchAllTicketQueues();
    const { data: priorities, isLoading: prioritiesLoading } = useFetchPriorities();

    if (isLoading || queueDataLoading || prioritiesLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (data && queueData && priorities) {
        return (
            <AddTicketForm queueData={queueData?.queues} channelData={data} priorities={priorities} toggleAddTicketDrawer={props.toggleAddTicketDrawer} />
        )
    }

    return <span>Error {error as any}</span>
}