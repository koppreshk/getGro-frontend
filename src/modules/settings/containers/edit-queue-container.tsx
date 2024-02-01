import React from "react";
import { useNotifications } from "lib";
import { Queue, useEditQueue, useFetchTicketMetadata } from "../apis"
import { IQueueFormFields, TicketQueueForm } from "../component/ticket-configurations/ticket-queue"
import { Close } from "@mui/icons-material";
import { Drawer, Typography, IconButton } from "@mui/material";
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { HeaderWrapper } from "modules/tickets/components/ticket-details/ticket-list-view";

interface IEditQueueContainerProps {
    queueMetadata: Queue;
    openAddQueueDrawer: boolean;
    toggleAddQueueDrawer: () => void;
}

export const EditQueueContainer = (props: IEditQueueContainerProps) => {
    const { toggleAddQueueDrawer, openAddQueueDrawer, queueMetadata } = props;
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
            autoAssignType: formData.autoAssignType,
            id: queueMetadata.id,
            name: formData.queueName,
            queueType: formData.queueType
        }).then(() => {
            showNotification({ message: 'Queue edited successfully', type: 'success' });
            props.toggleAddQueueDrawer();
        }).catch(() => showNotification({ message: 'Failed to edit the queue', type: 'error' }))
    }, [editQueue, props, queueMetadata.id, showNotification]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    const { auto_assign_types, employees, queue_types } = data!;

    return (
        <Drawer anchor="right" open={openAddQueueDrawer} onClose={toggleAddQueueDrawer}>
            <FlexBox width="600px" height="100%" flexDirection="column">
                <HeaderWrapper width="100%" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5">Edit Queue</Typography>
                    <IconButton aria-label="Close" onClick={toggleAddQueueDrawer}>
                        <Close />
                    </IconButton>
                </HeaderWrapper>
                <TicketQueueForm
                    mode="edit"
                    onFormSubmitHandler={onEditQueue}
                    autoAssignTypes={auto_assign_types}
                    employees={employees}
                    queueTypes={queue_types}
                    defaultValues={{
                        autoAssignType: queueMetadata.autoAssignType,
                        backUpEmployee: [],
                        backupEmployeeType: '',
                        assignedEmployees: queueMetadata.assignedEmployees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item.lastName ?? ''}` })),
                        maxAssignments: 0,
                        queueKey: queueMetadata.uniqueKey,
                        queueName: queueMetadata.name,
                        queueType: queueMetadata.queueType,
                        timeout: 0
                    }} />
            </FlexBox>
        </Drawer>
    )
}