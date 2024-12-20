import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  WhatsAppConfigurationEndPoint,
  WhatsAppConfigurationQueryKey,
} from '.';

export const useDeleteWhatsAppConfiguration = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteWhatsAppConfig = React.useCallback(
    () =>
      postData(WhatsAppConfigurationEndPoint.DELETE_WHATSAPP_CONFIG).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: deleteWhatsAppConfig,
    mutationKey: WhatsAppConfigurationQueryKey.DELETE_WHATSAPP_CONFIG,
    onSuccess: () => {
      queryClient.invalidateQueries(
        WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_CONFIG
      );
    },
  });
};
