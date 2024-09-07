import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { AddTicketForm } from "../components/ticket-details/ticket-list-view/add-ticket/add-ticket-form";
import { useFetchPriorities } from "../apis";
import { useFetchAllTags } from "modules/settings/apis/tags";

export const AddTicketContainer = (props: { toggleAddTicketDrawer: () => void }) => {
    const { data: priorities, isLoading: prioritiesLoading, error } = useFetchPriorities();
    const { data: allTags, isLoading: tagsLoading } = useFetchAllTags();

    if (tagsLoading || prioritiesLoading) {
        return (
            <CenteredCircularProgress />
        )
    }

    if (priorities && allTags) {
        return (
            <AddTicketForm priorities={priorities} allTags={allTags} toggleAddTicketDrawer={props.toggleAddTicketDrawer} />
        )
    }

    return <ErrorMessage statusCode={error?.message} />
}