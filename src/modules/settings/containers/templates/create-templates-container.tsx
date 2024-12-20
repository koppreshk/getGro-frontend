import { useNotifications } from 'lib';
import { useCreateTemplates } from 'modules/settings/apis/templates';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import { TemplatesForm } from 'modules/settings/component/ticket-configurations/templates/add-templates-form';
import React from 'react';

export interface ITemplatesFormFields {
  name: string;
  template?: string | number;
}

export const CreateTemplatesContainer = (props: {
  toggleAddStatusDrawer: () => void;
  statusData?: IGenericResponse[];
}) => {
  const { mutateAsync: createTemplates, isLoading } = useCreateTemplates();
  const { showNotification } = useNotifications();

  const submitTemplates = React.useCallback(
    (fromValues: ITemplatesFormFields) => {
      createTemplates({
        name: fromValues.name,
      })
        .then(() => {
          showNotification({ message: 'Templates created', type: 'success' });
          props.toggleAddStatusDrawer();
        })
        .catch(() =>
          showNotification({
            message: 'Failed to create Templates',
            type: 'error',
          })
        );
    },
    [createTemplates, props, showNotification]
  );

  return (
    <TemplatesForm
      mode="create"
      onFormSubmitHandler={submitTemplates}
      mutationLoading={isLoading}
      statusData={props.statusData}
    />
  );
};
