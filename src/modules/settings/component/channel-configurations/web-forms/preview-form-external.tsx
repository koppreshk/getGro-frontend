import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import {
  useFetchExternalWebform,
  useSubmitExternalWebform,
} from 'modules/settings/apis/channel-configurations/webforms';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { IPreviewFormFields, PreviewForm } from './preview-form';

export const ExternalPreviewForm = () => {
  const { token } = useParams();
  const { data, isLoading, error } = useFetchExternalWebform(token!);
  const { mutateAsync, isSuccess } = useSubmitExternalWebform();

  const form = useForm();

  const onSubmit = (formdata: IPreviewFormFields) => {
    return mutateAsync({
      form_data: {
        email: formdata.Email,
        help: formdata.Help,
        name: formdata.Name,
        phone_number: formdata.PhoneNumber,
        subject: formdata.Subject,
      },
      token: token!,
    });
  };

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return (
      <FormProvider {...form}>
        <PreviewForm
          formTitle={data.form.form_title || ''}
          formDescription={data.form.form_description || ''}
          btnBgColor={data.form.button_bg_color}
          btnTextColor={data.form.button_text_color}
          footerMessage={data.form.footer_message || ''}
          submitBtnName={data.form.submit_button_text}
          onSubmit={onSubmit}
          isSuccess={isSuccess}
        />
      </FormProvider>
    );
  }

  return <ErrorMessage statusCode={error?.message} />;
};
