import { useNotifications } from 'lib';
import { useSetupImap } from 'modules/settings/apis/channel-configurations/email';
import {
  AddImap,
  IAddImapConfigFormFields,
} from 'modules/settings/component/channel-configurations';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const AddImapConfigContainer = () => {
  const { mutateAsync, isLoading: mutationLoading } = useSetupImap();
  const { showNotification } = useNotifications();
  const { t } = useTranslation();

  const form = useForm<IAddImapConfigFormFields>({
    defaultValues: {
      imap_username: '',
      imap_password: '',
      imap_host: '',
      imap_port: 0,
      smtp_host: '',
      smtp_port: 0,
    },
  });

  const onSubmit = (formData: IAddImapConfigFormFields) => {
    mutateAsync(formData)
      .then(() => {
        showNotification({
          message: t('imap_add_config_success'),
          type: 'success',
        });
      })
      .catch(() => {
        showNotification({
          message: t('imap_add_config_error'),
          type: 'error',
        });
      });
  };

  return (
    <FormProvider {...form}>
      <AddImap onSubmit={onSubmit} mutationLoading={mutationLoading} />
    </FormProvider>
  );
};
