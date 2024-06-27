import { CircularProgress } from "@mui/material";
import { useFetchAllStatuses } from "modules/settings/apis/ticket-status";
import { ITicketDetails, useUpdateStatus } from "modules/tickets/apis";
import { TicketStatus } from "modules/tickets/components/ticket-details/ticket-details-section/ticket-overview";

interface ITicketStatusContainerProps extends Pick<ITicketDetails, 'ticketId' | 'ticketStatus'> {

}
export const TicketStatusContainer = (props: ITicketStatusContainerProps) => {
    const { ticketId, ticketStatus } = props;
    const { data, isLoading } = useFetchAllStatuses();
    const { mutateAsync } = useUpdateStatus();

    const onStatusChange = (statusId: number) => {
        return mutateAsync({
            statusId: statusId,
            ticketId: ticketId
        })
    }

    if (isLoading) {
        return <CircularProgress size={32} />
    }

    return (
        <>
            <TicketStatus ticketStatus={ticketStatus} menuOptions={data!} onStatusChange={onStatusChange} />
        </>
    )
}