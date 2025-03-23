import { useNotifications } from 'lib';
import {
  IFetchAllStatuses,
  useEditTicketStatus,
} from 'modules/settings/apis/ticket-status';
import { TicketStatusForm } from 'modules/settings/component/ticket-configurations/ticket-status';
import React from 'react';

import { ITicketStatusFormFields } from './create-ticket-status-container';

interface IEditTicketStatusContainerProps {
  onSelectRowMetaData: IFetchAllStatuses;
  statusData: IFetchAllStatuses[] | undefined;
  toggleDrawer: () => void;
}

export const EditTicketStatusContainer = (
  props: IEditTicketStatusContainerProps
) => {
  const { onSelectRowMetaData, statusData, toggleDrawer } = props;
  const { mutateAsync: editTicketStatus, isLoading } = useEditTicketStatus();
  const { showNotification } = useNotifications();

  const onEditStatusTicket = React.useCallback(
    (formValues: ITicketStatusFormFields) => {
      editTicketStatus({
        id: formValues.ticketStatusId!,
        name: formValues.ticketStatusName,
        description: formValues.ticketStatusDescription,
      })
        .then(() => {
          showNotification({
            message: 'Ticket Status edited successfully',
            type: 'success',
          });
          toggleDrawer();
        })
        .catch(() =>
          showNotification({
            message: 'Failed to edit Ticket Status',
            type: 'error',
          })
        );
    },
    [editTicketStatus, showNotification, toggleDrawer]
  );

  return (
    <TicketStatusForm
      mode="edit"
      onFormSubmitHandler={onEditStatusTicket}
      toggleDrawer={toggleDrawer}
      mutationLoading={isLoading}
      statusData={statusData}
      defaultValues={{
        ticketStatusName: onSelectRowMetaData.name,
        ticketStatusId: onSelectRowMetaData.id,
        ticketStatusDescription: onSelectRowMetaData.description,
      }}
    />
  );
};
