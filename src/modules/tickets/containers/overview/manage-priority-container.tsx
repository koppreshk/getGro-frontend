import { CenteredCircularProgress } from "lib/ui-ux";
import { ITicketDetails, useFetchPriorities } from "modules/tickets/apis";
import { ManagePriority } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview"

interface IManagePriorityContainerProps extends Pick<ITicketDetails, 'priority'> {

}

export const ManagePriorityContainer = (props: IManagePriorityContainerProps) => {
    const { data, isLoading } = useFetchPriorities();

    const onChangePriority = (newPriority: number) => {
        console.log(newPriority);
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