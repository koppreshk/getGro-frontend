import React from "react";
import { useServiceClient } from "lib";
import { useMutation, useQueryClient } from "react-query";
import { IShopifyConfigDetails } from "./setup-shopify-configurations";
import { ShopifyConfigurationEndPoint, ShopifyConfigurationQueryKey } from "./api-enums";

export const useEditShopifyConfiguration = () => {
    const { postData } = useServiceClient();
    const queryClient = useQueryClient();

    const editShopifyConfig = React.useCallback((args: IShopifyConfigDetails) =>
        postData(ShopifyConfigurationEndPoint.EDIT_STORE, args).then((res) => res.json()), [postData]);

    return useMutation({
        mutationFn: editShopifyConfig,
        mutationKey: ShopifyConfigurationQueryKey.EDIT_STORE,
        onSuccess: () => {
            queryClient.invalidateQueries(ShopifyConfigurationQueryKey.FETCH_ALL_STORES);
        }
    })
}