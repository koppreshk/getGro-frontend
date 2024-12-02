import { useCreateWebForm } from 'modules/settings/apis/channel-configurations/webforms';
import {
  AddWebForm,
  WebFormFields,
} from 'modules/settings/component/channel-configurations/web-forms/add-web-form';

export const AddWebFormConfigContainer = () => {
  const { mutateAsync, isLoading: mutationLoading } = useCreateWebForm();

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
    });
  };

  return <AddWebForm onSubmit={onSubmit} mutationLoading={mutationLoading} />;
};
