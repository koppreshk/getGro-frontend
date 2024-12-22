import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { GupShupConfigurationEndPoint, GupShupConfigurationQueryKey } from '.';

export interface ISetupGupShupArgs {
  app_name: string;
  api_key: string;
  number: string;
  app_id: string;
  webhook_url?: string;
}

export const useSetupGupshupConfigurations = () => {
  const { postData } = useServiceClient();

  const setupWhatsAppConfig = React.useCallback(
    (args: ISetupGupShupArgs) =>
      postData(GupShupConfigurationEndPoint.SETUP_WHATSAPP_CONFIG, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: setupWhatsAppConfig,
    mutationKey: GupShupConfigurationQueryKey.SETUP_WHATSAPP_CONFIG,
  });
};
