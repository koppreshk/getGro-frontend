import { CenteredCircularProgress } from "lib/ui-ux";
import { ITicketDetails, useChangePriority, useFetchPriorities } from "modules/tickets/apis";
import { ManagePriority } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview"

interface IManagePriorityContainerProps extends Pick<ITicketDetails, 'priority' | 'ticketId'> {

}

export const ManagePriorityContainer = (props: IManagePriorityContainerProps) => {
    const { data, isLoading } = useFetchPriorities();
    const { mutateAsync } = useChangePriority(props.ticketId);

    const onChangePriority = (newPriority: number) => {
        return mutateAsync({
            priorityId: newPriority
        })
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    return (
        <>
            <ManagePriority allPriorities={data!} priority={props.priority} onChangePriority={onChangePriority} />
        </>
    )
}