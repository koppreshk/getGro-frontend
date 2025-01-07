import { t } from 'i18next';
import { useNotifications } from 'lib';
import {
  CannedResponse,
  useCreateCannedResponse,
} from 'modules/settings/apis/canned-response';
import { CannedResponseForm } from 'modules/settings/component/ticket-configurations/canned-response/add-canned-response-form';
import React from 'react';

export interface ICannedResponseFormFields {
  name: string;
  template: string;
}

export const CreateCannedResponseContainer = (props: {
  toggleAddStatusDrawer: () => void;
  cannedResponseData?: CannedResponse[];
}) => {
  const { mutateAsync: createCannedResponse, isLoading } =
    useCreateCannedResponse();
  const { showNotification } = useNotifications();

  const submitCannedResponse = React.useCallback(
    (fromValues: ICannedResponseFormFields) => {
      createCannedResponse({
        name: fromValues.name,
        body: fromValues.template,
      })
        .then((res) => {
          if (res.status) {
            showNotification({
              message: t('canned_response_create_success'),
              type: 'success',
            });
            props.toggleAddStatusDrawer();
          }
        })
        .catch(() =>
          showNotification({
            message: t('canned_response_create_failure'),
            type: 'error',
          })
        );
    },
    [createCannedResponse, props, showNotification]
  );

  return (
    <CannedResponseForm
      mode="create"
      onFormSubmitHandler={submitCannedResponse}
      mutationLoading={isLoading}
      statusData={props.cannedResponseData}
    />
  );
};
