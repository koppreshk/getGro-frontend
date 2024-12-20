import { useNotifications } from 'lib';
import { useDeactivateUser } from 'modules/settings/apis/users-and-permissions/agents/deactivate-user';
import {
  DeactivateAgent,
  DeactivateAgentDialogFormFields,
} from 'modules/settings/component/user-and-permissions';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const DeactivateAgentContainer = (props: {
  id: number | string;
  canDeactivate: boolean;
}) => {
  const { mutateAsync, isLoading } = useDeactivateUser();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const onDeleteHandler = React.useCallback(
    (formData: DeactivateAgentDialogFormFields) => {
      const { deactivateAgent, queue_id, reassign_to } = formData;

      const reassignObj =
        deactivateAgent === 'deactivate_and_reassign_tickets'
          ? { queue_id, reassign_to }
          : {};

      mutateAsync({
        id: props.id,
        deactivation_type: props.canDeactivate ? undefined : deactivateAgent,
        ...reassignObj,
      })
        .then(() =>
          showNotification({
            message: t('deactivate_user_success'),
            type: 'success',
          })
        )
        .catch(() =>
          showNotification({
            message: t('deactivate_user_failure'),
            type: 'error',
          })
        );
    },
    [mutateAsync, props.canDeactivate, props.id, showNotification, t]
  );

  return (
    <DeactivateAgent
      onDeleteHandler={onDeleteHandler}
      canDeactivate={props.canDeactivate}
      mutationLoading={isLoading}
    />
  );
};
