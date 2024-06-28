import { useNotifications } from "lib";
import { useEditTicketStatus } from "modules/settings/apis/ticket-status"
import { IGenericResponse } from "modules/settings/apis/ticket-status/types";
import React from "react";
import { ITicketStatusFormFields } from "./create-ticket-status-container";
import { TicketStatusForm } from "modules/settings/component/ticket-configurations/ticket-status";

interface IEditTicketStatusContainerProps {
    onSelectRowMetaData: IGenericResponse;
    toggleDrawer: () => void;
}

export const EditTicketStatusContainer = (props: IEditTicketStatusContainerProps) => {
    const { onSelectRowMetaData, toggleDrawer } = props;
    const { mutateAsync: editTicketStatus } = useEditTicketStatus();
    const { showNotification } = useNotifications();

    const onEditStatusTicket = React.useCallback((data: ITicketStatusFormFields) => {
        editTicketStatus({
            id: data.ticketStatusId!,
            name: data.ticketStatusName
        }).then(() => {
            showNotification({ message: 'Ticket Status edited successfully', type: 'success' });
            toggleDrawer();
        }).catch(() => showNotification({ message: 'Failed to edit Ticket Status', type: 'error' }))
    }, [editTicketStatus, showNotification, toggleDrawer]);

    return (
        <TicketStatusForm
            mode="edit"
            onFormSubmitHandler={onEditStatusTicket}
            defaultValues={{
                ticketStatusName: onSelectRowMetaData.name,
                ticketStatusId: onSelectRowMetaData.id
            }}
        />
    )
}