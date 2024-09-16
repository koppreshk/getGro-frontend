import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ShopifyConfigurationEndPoint, ShopifyConfigurationQueryKey } from ".";

export const useFetchShopifyStoreConfig = (storeId: number) => {
    const { getData } = useServiceClient();

    const fetchShopifyConfigurations = React.useCallback(() => 
        getData(`${ShopifyConfigurationEndPoint.FETCH_STORE}?store_id=${storeId}`).then((res) => res.json()), [getData, storeId]);

    return useQuery({
        queryFn: fetchShopifyConfigurations,
        queryKey: ShopifyConfigurationQueryKey.FETCH_STORE
    });
}