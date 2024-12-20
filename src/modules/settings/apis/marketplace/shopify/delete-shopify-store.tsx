import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ShopifyConfigurationEndPoint,
  ShopifyConfigurationQueryKey,
} from './api-enums';

export interface IDeleteShopifyStore {
  store_id: number;
}

export const useDeleteShopifyStore = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteShopifyStore = React.useCallback(
    (args: IDeleteShopifyStore) =>
      postData(ShopifyConfigurationEndPoint.DELETE_STORE, args),
    [postData]
  );

  return useMutation({
    mutationFn: deleteShopifyStore,
    mutationKey: ShopifyConfigurationQueryKey.DELETE_STORE,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ShopifyConfigurationQueryKey.FETCH_ALL_STORES
      );
    },
  });
};
