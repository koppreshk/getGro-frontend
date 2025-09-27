import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';

export interface IExotelConfigDetails {
  exotel_subdomain: string;
  exotel_api_key: string;
  exotel_api_token: string;
  exotel_account_sid: string;
  webhook_url?: string;
  account_type: 'browser_calling' | 'normal_calling';
  /**
   * Needed if account_type is browser_calling
   */
  customer_id?: string;
  /**
   * Needed if account_type is browser_calling
   */
  customer_secret?: string;
}

export const useSetupExotelConfigurations = () => {
  const { postData } = useServiceClient();

  const setupExotel = React.useCallback(
    (args: IExotelConfigDetails) =>
      postData(ExotelConfigurationEndPoint.INSTALL_EXOTEL_CONFIG, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: setupExotel,
    mutationKey: ExotelConfigurationQueryKey.INSTALL_EXOTEL_CONFIG,
  });
};
