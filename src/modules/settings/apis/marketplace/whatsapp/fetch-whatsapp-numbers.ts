import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  WhatsAppConfigurationEndPoint,
  WhatsAppConfigurationQueryKey,
} from '.';

export interface IWhatsAppNumbers {
  id: number;
  name: string;
  whatsapp_number: string;
  whatsapp_phone_number_id: string;
  whatsapp_business_id: string;
  created_by: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  queue_id: number | null;
}

export interface WhatsAppNumber extends IWhatsAppNumbers {
  is_active: boolean;
  send_auto_reply: boolean;
  auto_reply_message: string;
}

export const useFetchWhatsAppNumbers = () => {
  const { getData } = useServiceClient();

  const fetchExotelConfigurations = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: WhatsAppConfigurationEndPoint.FETCH_WHATSAPP_NUMBERS,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IWhatsAppNumbers[]>({
    queryFn: fetchExotelConfigurations,
    queryKey: WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBERS,
  });
};

export const useFetchWhatsAppNumber = (id: number) => {
  const { getData } = useServiceClient();

  const fetchExotelConfigurations = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${WhatsAppConfigurationEndPoint.FETCH_WHATSAPP_NUMBER}?id=${id}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, id]
  );

  return useQuery<WhatsAppNumber>({
    queryFn: fetchExotelConfigurations,
    queryKey: [WhatsAppConfigurationQueryKey.FETCH_WHATSAPP_NUMBER, id],
  });
};
