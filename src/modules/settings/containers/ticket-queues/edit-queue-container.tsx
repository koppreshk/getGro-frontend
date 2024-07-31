import React from "react";
import { useNotifications } from "lib";
import { Queue, useEditQueue, useFetchTicketMetadata } from "../../apis/queues"
import { IQueueFormFields, TicketQueueForm } from "../../component/ticket-configurations/ticket-queue"
import { CenteredCircularProgress } from "lib/ui-ux";

interface IEditQueueContainerProps {
    queueMetadata: Queue;
    toggleAddQueueDrawer: () => void;
}

export const EditQueueContainer = (props: IEditQueueContainerProps) => {
    const { toggleAddQueueDrawer, queueMetadata } = props;
    const { data, isLoading } = useFetchTicketMetadata();
    const { mutateAsync: editQueue } = useEditQueue();
    const { showNotification } = useNotifications();

    const onEditQueue = React.useCallback((formData: IQueueFormFields) => {
        editQueue({
            assignedEmployees: formData.assignedEmployees.map((item) => ({
                firstName: item.value.split(' ')[0],
                lastName: item.value.split(' ')[1],
                id: Number(item.key)
            })),
            id: queueMetadata.id,
            name: formData.queueName,
        }).then(() => {
            showNotification({ message: 'Queue edited successfully', type: 'success' });
            toggleAddQueueDrawer();
        }).catch(() => showNotification({ message: 'Failed to edit the queue', type: 'error' }))
    }, [editQueue, queueMetadata.id, showNotification, toggleAddQueueDrawer]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    const { employees } = data!;

    return (
        <TicketQueueForm
            mode="edit"
            onFormSubmitHandler={onEditQueue}
            employees={employees}
            defaultValues={{
                backUpEmployee: [],
                backupEmployeeType: '',
                assignedEmployees: queueMetadata.assignedEmployees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item.lastName ?? ''}` })),
                queueKey: queueMetadata.uniqueKey,
                queueName: queueMetadata.name
            }} />
    )
}