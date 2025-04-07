import { t } from 'i18next';
import { useNotifications } from 'lib';
import { TextboxFieldWithLabel } from 'lib/form-fields';
import { useAppSelector } from 'lib/hooks';
import { CancelButton, FlexBox, IChangeArgs, LoadingButton } from 'lib/ui-ux';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LogoUploader from './logo-section';

export type GeneralContentFormValues = {
  portalName: string;
  logo: IChangeArgs;
};

interface GeneralContentProps {
  onSubmit: (formData: GeneralContentFormValues) => Promise<any>;
  isLoading: boolean;
}

export const GeneralContent = (props: GeneralContentProps) => {
  const { isLoading, onSubmit } = props;
  const config = useAppSelector((state) => state.core.config);
  const form = useForm<GeneralContentFormValues>({
    mode: 'onBlur',
    defaultValues: {
      portalName: config?.agent_portal.portal_name,
      logo: {
        selectedFiles: [
          {
            name: 'logo',
            content: config?.agent_portal.logo,
            size: 0,
            type: 'image/png',
          },
        ],
        action: 'add',
        changedFileIds: [],
      },
    },
  });
  const navigation = useNavigate();
  const { showNotification } = useNotifications();
  const onCancel = () => {
    form.reset();
    navigation(-1);
  };

  const onSubmitForm = async (formData: GeneralContentFormValues) => {
    onSubmit({
      logo: formData.logo,
      portalName: formData.portalName,
    })
      .then(() => {
        showNotification({
          type: 'success',
          message: t('portal_logo_updated'),
        });
        navigation(-1);
      })
      .catch(() => {
        showNotification({ message: t('portal_logo_failed'), type: 'error' });
      });
  };

  return (
    <FormProvider {...form}>
      <FlexBox flexDirection="column" gap={'20px'} width="50%" padding="20px">
        <TextboxFieldWithLabel
          name="portalName"
          label={t('portal_name')}
          helperText="The portal name specified below will be used in the agent portal as a tooltip for the logo"
        />
        <LogoUploader />
        <FlexBox gap={'20px'}>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={form.handleSubmit(onSubmitForm)}
            isLoading={isLoading}
          >
            {t('submit')}
          </LoadingButton>
          <CancelButton onClick={onCancel} />
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};
