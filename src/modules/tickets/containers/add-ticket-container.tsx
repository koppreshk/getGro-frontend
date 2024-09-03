import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { AddTicketForm } from "../components/ticket-details/ticket-list-view/add-ticket/add-ticket-form";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { useFetchPriorities } from "../apis";
import { useFetchAllTags } from "modules/settings/apis/tags";

export const AddTicketContainer = (props: { toggleAddTicketDrawer: () => void }) => {
    const { data: queueData, isLoading: queueDataLoading, error } = useFetchAllTicketQueues();
    const { data: priorities, isLoading: prioritiesLoading } = useFetchPriorities();
    const { data: allTags, isLoading: tagsLoading } = useFetchAllTags();

    if (tagsLoading || queueDataLoading || prioritiesLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (queueData && priorities && allTags) {
        return (
            <AddTicketForm queueData={queueData?.queues} priorities={priorities} allTags={allTags} toggleAddTicketDrawer={props.toggleAddTicketDrawer} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}