import React from "react";
import { useNotifications } from "lib";
import { ICreateTicketQueueArgs, useCreateTicketQueues } from "../apis"
import { AddTicketQueueForm } from "../component/ticket-configurations/ticket-queue"

interface ICreateTicketQueueContainerProps {
    toggleAddQueueDrawer: () => void;
}
export const CreateTicketQueueContainer = (props: ICreateTicketQueueContainerProps) => {
    const { mutateAsync: createTicketQueue } = useCreateTicketQueues();
    const { showNotification } = useNotifications();

    const submitCreateTicketQueue = React.useCallback((data: ICreateTicketQueueArgs) => {
        createTicketQueue({
            queueName: data.queueName,
            queueKey: data.queueKey,
            autoAssignType: data.autoAssignType,
            type: data.type,
            assigned_employees: data.assigned_employees
        }).then(() => {
            showNotification({ message: 'New Ticket Queue created', type: 'success' });
            props.toggleAddQueueDrawer();
        })
    }, [createTicketQueue, props, showNotification]);

    return (
        <AddTicketQueueForm submitCreateTicketQueue={submitCreateTicketQueue} />
    )
}