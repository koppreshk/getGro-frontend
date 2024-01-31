import React from "react";
import { useNotifications } from "lib";
import { ICreateTicketQueueArgs, useCreateTicketQueues, useFetchTicketMetadata } from "../apis"
import { AddTicketQueueForm } from "../component/ticket-configurations/ticket-queue"

interface ICreateTicketQueueContainerProps {
    toggleAddQueueDrawer: () => void;
}
export const CreateTicketQueueContainer = (props: ICreateTicketQueueContainerProps) => {
    const { mutateAsync: createTicketQueue } = useCreateTicketQueues();
    const { data } = useFetchTicketMetadata();
    const { showNotification } = useNotifications();

    const submitCreateTicketQueue = React.useCallback((data: ICreateTicketQueueArgs) => {
        createTicketQueue({
            queueName: data.queueName,
            queueKey: data.queueKey,
            autoAssignType: data.autoAssignType,
            queueType: data.queueType,
            assigned_employees: data.assigned_employees
        }).then(() => {
            showNotification({ message: 'New Ticket Queue created', type: 'success' });
            props.toggleAddQueueDrawer();
        })
    }, [createTicketQueue, props, showNotification]);

    if (data) {
        const { auto_assign_types, employees, queue_types } = data;
        return (
            <AddTicketQueueForm
                submitCreateTicketQueue={submitCreateTicketQueue}
                autoAssignTypes={auto_assign_types}
                employees={employees}
                queueTypes={queue_types} />
        )
    }
}