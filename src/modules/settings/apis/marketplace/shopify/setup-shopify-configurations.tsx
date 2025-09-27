import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ShopifyConfigurationEndPoint,
  ShopifyConfigurationQueryKey,
} from './apis';

export interface IShopifyConfigDetails {
  store_name: string;
  store_url: string;
  store_access_token: string;
}

export const useSetupShopifylConfigurations = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const setupShopify = React.useCallback(
    (args: IShopifyConfigDetails) =>
      postData(ShopifyConfigurationEndPoint.CREATE_STORE, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: setupShopify,
    mutationKey: ShopifyConfigurationQueryKey.CREATE_STORE,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ShopifyConfigurationQueryKey.FETCH_ALL_STORES
      );
    },
  });
};
