import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  WhatsAppConfigurationQueryKey,
  WhatsAppConfigurationEndPoint,
} from './apis';

export interface IDeleteWhatsAppNumber {
  id: number;
}

export const useDeleteWhatsAppNumber = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteWhatsAppNumber = React.useCallback(
    (args: IDeleteWhatsAppNumber) =>
      postData(WhatsAppConfigurationEndPoint.DELETE_WHATSAPP_NUMBER, args),
    [postData]
  );

  return useMutation({
    mutationFn: deleteWhatsAppNumber,
    mutationKey: WhatsAppConfigurationQueryKey.DELETE_WHATSAPP_NUMBER,
    onSuccess: () => {
      queryClient.invalidateQueries(
        WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBERS
      );
    },
  });
};
