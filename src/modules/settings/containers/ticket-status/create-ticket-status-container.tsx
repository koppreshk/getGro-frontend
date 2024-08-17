import React from "react";
import { useNotifications } from "lib";
import { useCreateTicketStatus } from "modules/settings/apis/ticket-status"
import { TicketStatusForm } from "modules/settings/component/ticket-configurations/ticket-status";

export interface ITicketStatusFormFields {
    ticketStatusName: string;
    ticketStatusId?: number;
}

export const CreateTicketStatusContainer = (props: { toggleAddStatusDrawer: () => void }) => {
    const { mutateAsync: createTicketStatus, isLoading } = useCreateTicketStatus();
    const { showNotification } = useNotifications();

    const submitTicketStatus = React.useCallback((fromValues: ITicketStatusFormFields) => {
        createTicketStatus({
            name: fromValues.ticketStatusName
        }).then(() => {
            showNotification({ message: 'New Status created', type: 'success' });
            props.toggleAddStatusDrawer();
        }).catch(() => showNotification({ message: 'Failed to create Status', type: 'error' }))
    }, [createTicketStatus, props, showNotification]);

    return (
        <TicketStatusForm mode="create" onFormSubmitHandler={submitTicketStatus} mutationLoading={isLoading} />
    )
}