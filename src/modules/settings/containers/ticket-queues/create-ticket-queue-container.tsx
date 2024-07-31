import React from "react";
import { useNotifications } from "lib";
import { useCreateTicketQueues, useFetchTicketMetadata } from "../../apis/queues"
import { IQueueFormFields, TicketQueueForm } from "../../component/ticket-configurations/ticket-queue"
import { CenteredCircularProgress } from "lib/ui-ux";

interface ICreateTicketQueueContainerProps {
    toggleAddQueueDrawer: () => void;
}

export const CreateTicketQueueContainer = (props: ICreateTicketQueueContainerProps) => {
    const { mutateAsync: createTicketQueue } = useCreateTicketQueues();
    const { data, isLoading } = useFetchTicketMetadata();
    const { showNotification } = useNotifications();

    const submitCreateTicketQueue = React.useCallback((formData: IQueueFormFields) => {
        createTicketQueue({
            queueName: formData.queueName,
            queueKey: formData.queueKey,
            assigned_employees: formData.assignedEmployees.map((item) => ({
                firstName: item.value.split(' ')[0],
                lastName: item.value.split(' ')[1],
                id: Number(item.key)
            }))
        }).then(() => {
            showNotification({ message: 'New Ticket Queue created', type: 'success' });
            props.toggleAddQueueDrawer();
        }).catch(() => showNotification({ message: 'Failed to create the queue', type: 'error' }))
    }, [createTicketQueue, props, showNotification]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) { 
        return (
            <TicketQueueForm
                mode="create"
                onFormSubmitHandler={submitCreateTicketQueue}
                employees={data.employees} />
        )
    }
}