// import React from "react";
// import { useQuery } from "react-query";
// import { useServiceClient } from "lib";
// import { ShopifyConfigurationEndPoint, ShopifyConfigurationQueryKey } from ".";

// interface IFetchShopifyStore {
//     store_id: number;
// }

// export const useFetchShopifyStoreConfig = () => {
//     const { getData } = useServiceClient();

//     const fetchShopifyConfigurations = React.useCallback((args: IFetchShopifyStore) => 
//         getData(ShopifyConfigurationEndPoint.FETCH_STORE, args).then((res) => res.json()), [getData]);

//     return useQuery({
//         queryFn: fetchShopifyConfigurations,
//         queryKey: ShopifyConfigurationQueryKey.FETCH_STORE
//     });
// }