import React from "react";
import { useNotifications } from "lib";
import { useSetupShopifylConfigurations } from "modules/settings/apis/marketplace/shopify";
import { AddShopifyConfigurationFormBase } from "modules/settings/component/apps/marketplace/shopify";

export interface IShopifyFormFields {
    storeName: string;
    storeUrl: string;
    accessToken: string;
}

export const AddShopifyConfigContainer = (props: { togglePopup: () => void; }) => {
    const {togglePopup} = props;
    const { mutateAsync, isLoading: isMutationLoading } = useSetupShopifylConfigurations();
    const { showNotification } = useNotifications();
    
    const onSubmit = React.useCallback((formData: IShopifyFormFields) => {
        mutateAsync({
            store_name: formData.storeName,
            store_url: formData.storeUrl.concat('.myshopify.com'),
            store_access_token: formData.accessToken,
        }).then(() => {
            togglePopup();
            showNotification({ message: 'Shopify configured successfully', type: 'success' });
        }).catch(() => {
            togglePopup();
            showNotification({ message: 'Failed to setup Shopify configurations', type: 'error' })
        })
    }, [mutateAsync, showNotification, togglePopup])

    return (
        <AddShopifyConfigurationFormBase
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading}
        />
    )
}