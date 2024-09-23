import { FormProvider, useForm } from "react-hook-form";
import { IAddShopifyConfigurationFormProps, ShopifyStoreConfigForm } from "./add-shopify-store-form";
import { IShopifyFormFields } from "modules/settings/containers/marketplace/shopify";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";

interface IEditShopifyStoreFormProps extends IAddShopifyConfigurationFormProps {
    storeData: IShopifyStore;
}

export const EditShopifyStoreFormBase = (props: IEditShopifyStoreFormProps) => {
    const { storeData } = props;
    const form = useForm<IShopifyFormFields>({
        defaultValues: {
            storeName: storeData.store_name,
            storeUrl: storeData.store_url,
            accessToken: storeData.access_token
        }
    });

    return (
        <FormProvider {...form}>
            <ShopifyStoreConfigForm {...props} />
        </FormProvider>
    )
}