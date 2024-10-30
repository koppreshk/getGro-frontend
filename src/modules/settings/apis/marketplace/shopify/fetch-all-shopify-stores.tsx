import React from "react";
import { useQuery } from "react-query";
import { useServiceClient } from "lib";
import { ShopifyConfigurationEndPoint, ShopifyConfigurationQueryKey } from ".";

export interface IShopifyStore {
    id: number;
    store_name: string;
    store_url: string;
    created_at: string;
    admin: string;
    access_token: string;
}

export const useFetchAllShopifyStores = () => {
    const { getData } = useServiceClient();

    const fetchAllShopifyStores = React.useCallback(() => getData(ShopifyConfigurationEndPoint.FETCH_ALL_STORES).then((res) => res.json()), [getData]);

    return useQuery<IShopifyStore[], { message: string }>({
        queryFn: fetchAllShopifyStores,
        queryKey: ShopifyConfigurationQueryKey.FETCH_ALL_STORES
    });
}