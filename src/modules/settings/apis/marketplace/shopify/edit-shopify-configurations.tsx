import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ShopifyConfigurationEndPoint,
  ShopifyConfigurationQueryKey,
} from './api-enums';
import { IShopifyConfigDetails } from './setup-shopify-configurations';

interface IEditShopifyConfigDetails extends IShopifyConfigDetails {
  store_id: number;
}

export const useEditShopifyConfiguration = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editShopifyConfig = React.useCallback(
    (args: IEditShopifyConfigDetails) =>
      postData(ShopifyConfigurationEndPoint.EDIT_STORE, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: editShopifyConfig,
    mutationKey: ShopifyConfigurationQueryKey.EDIT_STORE,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ShopifyConfigurationQueryKey.FETCH_ALL_STORES
      );
    },
  });
};
