import { ContentCopy } from '@mui/icons-material';
import {
  DialogActions,
  Divider,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useNotifications } from 'lib';
import {
  PasswordFieldWithLabel,
  TextboxField,
  TextboxFieldWithLabel,
} from 'lib/form-fields';
import {
  BackButton,
  CancelButton,
  CustomIconButton,
  FlexBox,
  LoadingButton,
} from 'lib/ui-ux';
import { CreateWhatsAppConfigResponse } from 'modules/settings/apis/marketplace/whatsapp';
import { ConfigStepper } from 'modules/settings/common';
import React from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface IWhatsAppConfigFormProps {
  isMutationLoading: boolean;
  togglePopup: () => void;
  onSubmit: (
    formValues: IAddWhatsAppFormField
  ) => Promise<CreateWhatsAppConfigResponse>;
  updateInstallation: () => void;
}

export interface IAddWhatsAppFormField {
  appId: string;
  appSecret: string;
  whatsAppToken: string;
  webhookURL: string;
  webhookVerifyToken: string;
}

const steps = [
  {
    label: 'App Configuration',
    description:
      'WhatsApp authentication for verifying and integrating with getgro.',
  },
  {
    label: 'Webhook',
    description:
      'Configure the provided webhook URL and verify toke on the meta site to receive alerts when a message is received from WhatsApp',
  },
];

const AppConfiguration = () => {
  return (
    <FlexBox flexDirection="column" gap="30px" width="75%">
      <TextboxFieldWithLabel
        name="appId"
        size="small"
        type="text"
        label="App Id"
        fullWidth
        rules={{ required: 'App Id required' }}
      />
      <PasswordFieldWithLabel
        name="appSecret"
        size="small"
        type="password"
        label="App Secret"
        rules={{ required: 'App Secret required' }}
        fullWidth
        autoComplete="off"
      />
      <PasswordFieldWithLabel
        name="whatsAppToken"
        size="small"
        type="password"
        label="WhatsApp Token"
        rules={{ required: 'WhatsApp Token required' }}
        fullWidth
      />
    </FlexBox>
  );
};

const WebhookConfigurations = () => {
  const { showNotification } = useNotifications();
  const { watch } = useFormContext<IAddWhatsAppFormField>();
  const { t } = useTranslation();

  const onCopy = (name: keyof IAddWhatsAppFormField) => {
    navigator.clipboard
      .writeText(watch(name)!)
      .then(() =>
        showNotification({ message: t('copied_to_clipboard'), type: 'success' })
      )
      .catch(() =>
        showNotification({ message: t('failed_to_copy'), type: 'error' })
      );
  };

  return (
    <FlexBox flexDirection="column" gap="30px" width="75%">
      <FlexBox flexDirection="column" gap="5px" width="100%">
        <Typography variant="h5">{t('webhook')}</Typography>
        <TextboxField
          name="webhookURL"
          size="small"
          type="text"
          fullWidth
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CustomIconButton
                  onClick={() => onCopy('webhookURL')}
                  iconComponent={<ContentCopy />}
                  tooltipProps={{ title: 'Copy Webhook url', arrow: true }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FlexBox>
      <FlexBox flexDirection="column" gap="5px" width="100%">
        <Typography variant="h5">Webhook verify token</Typography>
        <TextboxField
          name="webhookVerifyToken"
          size="small"
          type="password"
          fullWidth
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CustomIconButton
                  onClick={() => onCopy('webhookVerifyToken')}
                  iconComponent={<ContentCopy />}
                  tooltipProps={{ title: 'Copy token url', arrow: true }}
                />
              </InputAdornment>
            ),
          }}
        />
      </FlexBox>
    </FlexBox>
  );
};

export const WhatsAppConfigForm = (props: IWhatsAppConfigFormProps) => {
  const { togglePopup, onSubmit, isMutationLoading, updateInstallation } =
    props;
  const form = useFormContext<IAddWhatsAppFormField>();
  const [activeStep, setActiveStep] = React.useState(0);
  const { t } = useTranslation();

  const onSubmitForm = async (formValues: IAddWhatsAppFormField) => {
    onSubmit(formValues).then((response: CreateWhatsAppConfigResponse) => {
      if (response.status) {
        form.setValue('webhookURL', response.webhook_url);
        form.setValue('webhookVerifyToken', response.token);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSaveHandler = () => {
    togglePopup();
    updateInstallation();
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <form autoComplete="off">
      <FlexBox gap="20px">
        <ConfigStepper activeStep={activeStep} steps={steps} />
        <Divider orientation="vertical" variant="middle" flexItem />
        {activeStep === 0 ? <AppConfiguration /> : <WebhookConfigurations />}
      </FlexBox>
      <DialogActions
        sx={{ justifyContent: 'space-between', paddingTop: '30px' }}
      >
        {activeStep > 0 ? (
          <BackButton variant="outlined" onClick={handleBack} />
        ) : (
          <div></div>
        )}
        <FlexBox gap="10px">
          <CancelButton onClick={togglePopup} />
          <LoadingButton
            variant="contained"
            isLoading={isMutationLoading}
            onClick={
              isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)
            }
          >
            {isLastStep ? t('save') : t('next')}
          </LoadingButton>
        </FlexBox>
      </DialogActions>
    </form>
  );
};

interface IAddWhatsAppConfigFormProps extends IWhatsAppConfigFormProps {}

export const AddWhatsAppConfigFormBase = (
  props: IAddWhatsAppConfigFormProps
) => {
  const form = useForm<IAddWhatsAppFormField>({
    defaultValues: {
      appId: '',
      appSecret: '',
      webhookVerifyToken: '',
      whatsAppToken: '',
      webhookURL: '',
    },
  });

  return (
    <FormProvider {...form}>
      <WhatsAppConfigForm {...props} />
    </FormProvider>
  );
};
