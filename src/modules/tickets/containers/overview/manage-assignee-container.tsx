import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { IChangeAsigneeArgs, useChangeAsignee } from "modules/tickets/apis";
import { ManageAssignee } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview"

export const ManageAssigneeContainer = (props: { ticketId: string }) => {
    const { data, isLoading } = useFetchAllTicketQueues();
    const { mutateAsync } = useChangeAsignee(props.ticketId);

    const onChangeAssignee = (args: IChangeAsigneeArgs) => {
        return mutateAsync(args);
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <ManageAssignee data={data!} onChangeAssignee={onChangeAssignee} />
        </>
    )
}