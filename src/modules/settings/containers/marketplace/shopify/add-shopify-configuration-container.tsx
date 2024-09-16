import { IShopifyConfigDetails, useSetupShopifylConfigurations } from "modules/settings/apis/marketplace/shopify";
import { AddShopifyConfigurationFormBase } from "modules/settings/component/apps/marketplace/shopify";

export interface IShopifyFormFields {
    storeName: string;
    storeUrl: string;
    accessToken: string;
}

export const AddShopifyConfigContainer = (props: { togglePopup: () => void; }) => {
    const { mutateAsync, isLoading: isMutationLoading } = useSetupShopifylConfigurations();

    const onSubmit = (data: IShopifyConfigDetails) => {
        return mutateAsync(data)
    }

    return (
        <AddShopifyConfigurationFormBase
            togglePopup={props.togglePopup}
            onSubmit={onSubmit}
            isMutationLoading={isMutationLoading}
        />
    )
}