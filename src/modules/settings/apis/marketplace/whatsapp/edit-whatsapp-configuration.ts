import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ICreateWhatsAppArgs,
  WhatsAppConfigurationEndPoint,
  WhatsAppConfigurationQueryKey,
} from '.';

export const useEditWhatsAppConfigurations = () => {
  const { postData } = useServiceClient();

  const editWhatsAppConfig = React.useCallback(
    (args: ICreateWhatsAppArgs) =>
      postData(WhatsAppConfigurationEndPoint.EDIT_WHATSAPP_CONFIG, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: editWhatsAppConfig,
    mutationKey: WhatsAppConfigurationQueryKey.EDIT_WHATSAPP_CONFIG,
  });
};
