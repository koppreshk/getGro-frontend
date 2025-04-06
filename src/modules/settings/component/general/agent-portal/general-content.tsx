import { Button } from '@mui/material';
import { t } from 'i18next';
import { TextboxFieldWithLabel } from 'lib/form-fields';
import { CancelButton, FlexBox } from 'lib/ui-ux';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LogoUploader from './logo-section';

type FormValues = {
  portalName: string;
  logo: string;
};

export const GeneralContent = () => {
  const form = useForm<FormValues>();
  const navigation = useNavigate();
  const onCancel = () => {
    form.reset();
    navigation(-1);
  };

  const onSubmitForm = async (formData: FormValues) => {
    console.log('Form submitted:', formData);
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
          <Button
            variant="contained"
            color="primary"
            onClick={form.handleSubmit(onSubmitForm)}
          >
            {t('submit')}
          </Button>
          <CancelButton onClick={onCancel} />
        </FlexBox>
      </FlexBox>
    </FormProvider>
  );
};
