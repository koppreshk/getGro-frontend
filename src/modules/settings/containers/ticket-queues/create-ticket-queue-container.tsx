import React from "react";
import { useNotifications } from "lib";
import { useCreateTicketQueues, useFetchTicketMetadata } from "../../apis/queues"
import { IQueueFormFields, TicketQueueForm } from "../../component/user-and-permissions/ticket-queue"
import { CenteredCircularProgress } from "lib/ui-ux";

interface ICreateTicketQueueContainerProps {
    toggleAddQueueDrawer: () => void;
}

export const CreateTicketQueueContainer = (props: ICreateTicketQueueContainerProps) => {
    const { mutateAsync: createTicketQueue, isLoading: mutationLoading } = useCreateTicketQueues();
    const { data, isLoading } = useFetchTicketMetadata();
    const { showNotification } = useNotifications();

    const submitCreateTicketQueue = React.useCallback((formData: IQueueFormFields) => {
        createTicketQueue({
            queueName: formData.queueName,
            assigned_employees: formData.assignedEmployees.map((item) => ({
                firstName: item.value.split(' ')[0],
                lastName: item.value.split(' ')[1],
                id: Number(item.key)
            }))
        }).then((res) => {
            if (res.status) {
                showNotification({ message: 'New Ticket Queue created', type: 'success' });
                props.toggleAddQueueDrawer();
                return;
            }
            showNotification({ message: res.message, type: 'error' })
        }).catch(() => showNotification({ message: 'Failed to create the queue', type: 'error' }))
    }, [createTicketQueue, props, showNotification]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <TicketQueueForm
                mode="create"
                mutationLoading={mutationLoading}
                toggleAddQueueDrawer={props.toggleAddQueueDrawer}
                onFormSubmitHandler={submitCreateTicketQueue}
                employees={data.employees} />
        )
    }
}