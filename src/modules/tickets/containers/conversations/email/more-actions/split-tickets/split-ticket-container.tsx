import { useNotifications } from "lib";
import { useAppSelector } from "lib/hooks";
import { useSplitTicket } from "modules/tickets/apis";
import { ISplitTicketsFormFields, SplitTicketProps, SplitTicketsContent } from "modules/tickets/components/ticket-details/ticket-conversation/email-conversations/more-actions/split-ticket";

interface SplitTicketsContainerProps extends Omit<SplitTicketProps, 'showSplitTicketDrawer'> {

}

export const SplitTicketsContainer = (props: SplitTicketsContainerProps) => {
    const ticketId = useAppSelector((state) => state.tickets.ticketDetails?.ticketId)
    const { onCloseDrawer, emailProps } = props;
    const { mutateAsync, isLoading } = useSplitTicket();

    const { showNotification } = useNotifications();

    const onSubmit = (formData: ISplitTicketsFormFields) => {
        const { assignee, associationWithTicket, copyAttachments, description, employeeId, queueId, subject } = formData;
        const assigneeOptionValue = assignee === 'manual' ? { assigned_to: employeeId, queue_id: queueId } : {}
        mutateAsync({
            subject,
            description,
            ticket_id: ticketId!,
            association_type: associationWithTicket,
            copy_attachments: copyAttachments,
            ticket_assignee_type: assignee,
            ...assigneeOptionValue
        }).then((res) => {
            if (res.status) {
                onCloseDrawer();
                showNotification({ message: 'Ticket split was successfull', type: 'success' })
            }
            else {
                showNotification({ message: res.message, type: 'error' })
            }
        }).catch(() => showNotification({ message: 'Failed to split tickets', type: 'error' }))
    }

    return <SplitTicketsContent mutationLoading={isLoading} onCloseDrawer={onCloseDrawer} emailProps={emailProps} onSubmit={onSubmit} />
}