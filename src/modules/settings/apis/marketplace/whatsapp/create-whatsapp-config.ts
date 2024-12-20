import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  WhatsAppConfigurationEndPoint,
  WhatsAppConfigurationQueryKey,
} from '.';

export interface ICreateWhatsAppArgs {
  app_id: string;
  app_secret: string;
  whatsapp_token: string;
}

export interface CreateWhatsAppConfigResponse {
  status: boolean;
  webhook_url: string;
  token: string;
}

export const useCreateWhatsAppConfiguration = () => {
  const { postData } = useServiceClient();

  const setupWhatsAppConfig = React.useCallback(
    (args: ICreateWhatsAppArgs) =>
      postData(WhatsAppConfigurationEndPoint.CREATE_WHATSAPP_CONFIG, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation<
    CreateWhatsAppConfigResponse,
    unknown,
    ICreateWhatsAppArgs
  >({
    mutationFn: setupWhatsAppConfig,
    mutationKey: WhatsAppConfigurationQueryKey.CREATE_WHATSAPP_CONFIG,
  });
};
