import { useNotifications } from 'lib';
import { CenteredCircularProgress } from 'lib/ui-ux';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Queue, useEditQueue, useFetchTicketMetadata } from '../../apis/queues';
import {
  IQueueFormFields,
  TicketQueueForm,
} from '../../component/user-and-permissions/ticket-queue';

interface IEditQueueContainerProps {
  queueMetadata: Queue;
  toggleAddQueueDrawer: () => void;
}

export const EditQueueContainer = (props: IEditQueueContainerProps) => {
  const { toggleAddQueueDrawer, queueMetadata } = props;
  const { data, isLoading } = useFetchTicketMetadata();
  const { mutateAsync: editQueue, isLoading: mutationLoading } = useEditQueue();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onEditQueue = React.useCallback(
    (formData: IQueueFormFields) => {
      editQueue({
        assignedEmployees: formData.assignedEmployees.map((item) => ({
          firstName: item.value.split(' ')[0],
          lastName: item.value.split(' ')[1],
          id: Number(item.key),
        })),
        id: queueMetadata.id,
        name: formData.queueName,
      })
        .then((res) => {
          if (res.status) {
            showNotification({
              message: t('edit_queue_created'),
              type: 'success',
            });
            toggleAddQueueDrawer();
            return;
          }
          showNotification({ message: res.message, type: 'error' });
        })
        .catch(() =>
          showNotification({ message: t('edit_queue_failed'), type: 'error' })
        );
    },
    [editQueue, queueMetadata.id, showNotification, t, toggleAddQueueDrawer]
  );

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  const { employees } = data!;

  return (
    <TicketQueueForm
      mode="edit"
      onFormSubmitHandler={onEditQueue}
      employees={employees}
      mutationLoading={mutationLoading}
      toggleAddQueueDrawer={toggleAddQueueDrawer}
      defaultValues={{
        assignedEmployees: queueMetadata.assignedEmployees.map((item) => ({
          key: item.id.toString(),
          value: `${item.firstName} ${item.lastName ?? ''}`,
        })),
        queueName: queueMetadata.name,
      }}
    />
  );
};
