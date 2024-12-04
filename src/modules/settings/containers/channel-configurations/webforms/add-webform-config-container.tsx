import { useNotifications } from 'lib';
import { useCreateWebForm } from 'modules/settings/apis/channel-configurations/webforms';
import {
  AddWebForm,
  WebFormFields,
} from 'modules/settings/component/channel-configurations/web-forms/add-web-form';
import { useNavigate } from 'react-router-dom';

export const AddWebFormConfigContainer = () => {
  const { mutateAsync, isLoading: mutationLoading } = useCreateWebForm();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();

  const onSubmit = (formData: WebFormFields) => {
    return mutateAsync({
      button_bg_color: formData.backgroundColor,
      button_text_color: formData.textColor,
      confirmation_message: formData.confirmationMessage,
      footer_message: formData.footerMessage,
      form_description: formData.formDescription,
      form_height: formData.formHeight.toString(),
      form_title: formData.formTitle,
      submit_button_text: formData.submitBtnName,
      web_form_name: formData.webFormName,
    })
      .then((res) => {
        if (res) {
          showNotification({
            message: 'add_webform_config_success',
            type: 'success',
          });
          navigate(-1);
        }
      })
      .catch(() => {
        showNotification({
          message: 'add_webform_config_failure',
          type: 'error',
        });
      });
  };

  return <AddWebForm onSubmit={onSubmit} mutationLoading={mutationLoading} />;
};
