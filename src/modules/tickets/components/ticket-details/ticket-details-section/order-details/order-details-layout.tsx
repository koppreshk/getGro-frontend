import { AllShopifyStoresContainer, OrderDetailsContainer } from "modules/tickets/containers";
import { useForm, FormProvider } from "react-hook-form";
import { CommonHeader } from "../common-header";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { IShopifyStore, useFetchAllShopifyStores } from "modules/settings/apis/marketplace/shopify";

interface OrderDetailsLayoutProps {
    customerId: string | null | undefined;
}

export const OrderDetailsLayout = (props: OrderDetailsLayoutProps) => {
    const { data: shopifyStoreData, isLoading: storeDataLoading, error } = useFetchAllShopifyStores();

    if (storeDataLoading) {
        return <CenteredCircularProgress />;
    }

    if (error) {
        return <ErrorMessage statusCode={error?.message} />
    }

    return (
        <>
            <CommonHeader headerName="Order Details" />
            <OrderDetailsLayoutBase {...props} shopifyStoreData={shopifyStoreData!} />
        </>
    )
}

const OrderDetailsLayoutBase = (props: OrderDetailsLayoutProps & { shopifyStoreData: IShopifyStore[] }) => {
    const { shopifyStoreData } = props;
    const form = useForm({
        defaultValues: {
            stores: shopifyStoreData[0]?.id.toString()
        }
    });

    return (
        <FormProvider {...form}>
            <AllShopifyStoresContainer shopifyStoreData={shopifyStoreData} />
            <OrderDetailsContainer customerId={props.customerId} />
        </FormProvider>
    )
}