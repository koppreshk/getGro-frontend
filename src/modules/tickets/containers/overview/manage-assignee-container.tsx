import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { ManageAssignee } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview"

export const ManageAssigneeContainer = () => {
    const { data, isLoading } = useFetchAllTicketQueues();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <ManageAssignee data={data!} />
        </>
    )
}