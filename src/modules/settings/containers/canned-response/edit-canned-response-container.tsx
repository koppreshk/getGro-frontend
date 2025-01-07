import { t } from 'i18next';
import { useNotifications } from 'lib';
import {
  CannedResponse,
  useEditCannedResponse,
} from 'modules/settings/apis/canned-response';
import { CannedResponseForm } from 'modules/settings/component/ticket-configurations/canned-response/add-canned-response-form';

import { ICannedResponseFormFields } from './create-canned-response-container';

interface IEditCannedResponseContainerProps {
  onSelectRowMetaData: CannedResponse;
  statusData: CannedResponse[] | undefined;
  toggleDrawer: () => void;
}

export const EditCannedResponseContainer = (
  props: IEditCannedResponseContainerProps
) => {
  const { onSelectRowMetaData, statusData } = props;
  const { mutateAsync, isLoading } = useEditCannedResponse();
  const { showNotification } = useNotifications();

  const onFormSubmitHandler = (fromValues: ICannedResponseFormFields) => {
    mutateAsync({
      id: onSelectRowMetaData.id,
      name: fromValues.name,
      body: fromValues.template,
      is_active: true,
    })
      .then((res) => {
        if (res.status) {
          showNotification({
            message: t('canned_response_edit_success'),
            type: 'success',
          });
          props.toggleDrawer();
        }
      })
      .catch(() =>
        showNotification({
          message: t('canned_response_edit_failure'),
          type: 'error',
        })
      );
  };

  return (
    <CannedResponseForm
      mode="edit"
      onFormSubmitHandler={onFormSubmitHandler}
      mutationLoading={isLoading}
      statusData={statusData}
      defaultValues={{
        name: onSelectRowMetaData.name,
        template: onSelectRowMetaData.body,
      }}
    />
  );
};
