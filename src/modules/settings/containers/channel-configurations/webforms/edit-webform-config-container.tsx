import { useNotifications } from 'lib';
import {
  IWebForms,
  useEditWebForm,
} from 'modules/settings/apis/channel-configurations/webforms';
import {
  AddWebForm,
  WebFormFields,
} from 'modules/settings/component/channel-configurations/web-forms/add-web-form';
import { useNavigate, useParams } from 'react-router-dom';

export const EditWebFormConfigContainer = (props: {
  allWebforms: IWebForms[];
}) => {
  const { allWebforms } = props;
  const { formId } = useParams();
  const currentForm = allWebforms.find(
    (item) => item.form_id.toString() === formId
  );
  const { mutateAsync, isLoading: mutationLoading } = useEditWebForm();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();

  const onSubmit = (formData: WebFormFields) => {
    return mutateAsync({
      form_id: formId!,
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
            message: 'edit_webform_config_success',
            type: 'success',
          });
          navigate(-1);
        }
      })
      .catch(() => {
        showNotification({
          message: 'edit_webform_config_failure',
          type: 'error',
        });
      });
  };

  const defaultValues = {
    backgroundColor: currentForm?.button_bg_color,
    confirmationMessage: currentForm?.confirmation_message,
    footerMessage: currentForm?.footer_message,
    formDescription: currentForm?.form_description,
    formHeight: Number(currentForm?.form_height),
    formTitle: currentForm?.form_title,
    submitBtnName: currentForm?.submit_button_text,
    textColor: currentForm?.button_text_color,
    webFormName: currentForm?.web_form_name,
  } as WebFormFields;

  return (
    <AddWebForm
      onSubmit={onSubmit}
      mutationLoading={mutationLoading}
      mode="edit"
      defaultValues={defaultValues}
    />
  );
};
