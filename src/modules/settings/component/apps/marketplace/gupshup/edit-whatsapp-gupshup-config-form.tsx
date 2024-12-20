import { IGupshupConfigDetails } from 'modules/settings/apis/marketplace/gupshup';
import { FormProvider, useForm } from 'react-hook-form';

import {
  IAddWhatsAppFormField,
  IWhatsAppGupshupConfigFormProps,
  WhatsAppGupshupConfigForm,
} from '.';

interface IEditWhatsAppGupshupConfigFormBaseProps
  extends IWhatsAppGupshupConfigFormProps {
  currentData: IGupshupConfigDetails;
}

export const EditWhatsAppGupshupConfigFormBase = (
  props: IEditWhatsAppGupshupConfigFormBaseProps
) => {
  const { currentData } = props;
  const form = useForm<IAddWhatsAppFormField>({
    defaultValues: {
      appAPIkey: currentData.api_key,
      appId: currentData.app_id,
      appName: currentData.app_name,
      appNumber: currentData.number,
      webhookURL: currentData.webhook_url,
    },
  });

  return (
    <FormProvider {...form}>
      <WhatsAppGupshupConfigForm {...props} />
    </FormProvider>
  );
};
