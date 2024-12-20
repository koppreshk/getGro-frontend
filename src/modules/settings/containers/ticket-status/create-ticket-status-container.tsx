import { useNotifications } from 'lib';
import { useCreateTicketStatus } from 'modules/settings/apis/ticket-status';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { TicketStatusForm } from 'modules/settings/component/ticket-configurations/ticket-status';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface ITicketStatusFormFields {
  ticketStatusName: string;
  ticketStatusId?: number;
}

export const CreateTicketStatusContainer = (props: {
  toggleAddStatusDrawer: () => void;
  statusData?: IGenericResponse[];
}) => {
  const { mutateAsync: createTicketStatus, isLoading } =
    useCreateTicketStatus();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const submitTicketStatus = React.useCallback(
    (fromValues: ITicketStatusFormFields) => {
      createTicketStatus({
        name: fromValues.ticketStatusName,
      })
        .then(() => {
          showNotification({
            message: t('new_status_created'),
            type: 'success',
          });
          props.toggleAddStatusDrawer();
        })
        .catch(() =>
          showNotification({ message: 'new_status_failed', type: 'error' })
        );
    },
    [createTicketStatus, props, showNotification, t]
  );

  return (
    <TicketStatusForm
      mode="create"
      onFormSubmitHandler={submitTicketStatus}
      mutationLoading={isLoading}
      statusData={props.statusData}
      toggleDrawer={props.toggleAddStatusDrawer}
    />
  );
};
