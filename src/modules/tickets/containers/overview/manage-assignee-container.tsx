import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchAllTicketQueues } from "modules/settings/apis";
import { IChangeAsigneeArgs, ITicketDetails, useChangeAsignee } from "modules/tickets/apis";
import { ManageAssignee } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview"

interface IManageAssigneeContainerProps extends Pick<ITicketDetails, 'ticketId' | 'assigneeInfo'> {

}

export const ManageAssigneeContainer = (props: IManageAssigneeContainerProps) => {
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
            <ManageAssignee data={data!} assigneeInfo={props.assigneeInfo} onChangeAssignee={onChangeAssignee} />
        </>
    )
}