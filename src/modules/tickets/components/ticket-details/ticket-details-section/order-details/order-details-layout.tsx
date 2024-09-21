import { useFetchAllShopifyStores } from "modules/settings/apis/marketplace/shopify";
import { AllShopifyStoresContainer, OrderDetailsContainer } from "modules/tickets/containers";
import { useForm, FormProvider } from "react-hook-form";
import { CommonHeader } from "../common-header";

export const OrderDetailsLayout = (props: { customerId: string | null | undefined }) => {
    const { data: shopifyStoreData, isLoading: storeDataLoading } = useFetchAllShopifyStores();

    const form = useForm({
        defaultValues: {
            stores: shopifyStoreData ? shopifyStoreData[0].id.toString() : ''
        }
    });

    return (
        <FormProvider {...form}>
            <CommonHeader headerName="Order Details" />

            <AllShopifyStoresContainer shopifyStoreData={shopifyStoreData} storeDataLoading={storeDataLoading}/>
            <OrderDetailsContainer customerId={props.customerId} />
        </FormProvider>
    )
}