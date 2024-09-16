import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ShopifyConfigurationEndPoint, ShopifyConfigurationQueryKey } from ".";

export const useFetchShopifyStoreConfig = () => {
    const { getData } = useServiceClient();

    const fetchShopifyConfigurations = React.useCallback(() => getData(ShopifyConfigurationEndPoint.FETCH_STORE).then((res) => res.json()), [getData]);

    return useQuery({
        queryFn: fetchShopifyConfigurations,
        queryKey: ShopifyConfigurationQueryKey.FETCH_STORE
    });
}