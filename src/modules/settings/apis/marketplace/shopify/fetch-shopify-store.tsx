import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  IShopifyStore,
  ShopifyConfigurationEndPoint,
  ShopifyConfigurationQueryKey,
} from '.';

export const useFetchShopifyStoreConfig = (storeId: number) => {
  const { getData } = useServiceClient();

  const fetchShopifyConfigurations = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ShopifyConfigurationEndPoint.FETCH_STORE}?store_id=${storeId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, storeId]
  );

  return useQuery<IShopifyStore>({
    queryFn: fetchShopifyConfigurations,
    queryKey: ShopifyConfigurationQueryKey.FETCH_STORE,
  });
};
