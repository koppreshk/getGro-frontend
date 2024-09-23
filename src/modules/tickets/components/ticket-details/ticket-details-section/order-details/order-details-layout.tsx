import { AllShopifyStoresContainer, OrderDetailsContainer } from "modules/tickets/containers";
import { useForm, FormProvider } from "react-hook-form";
import { CommonHeader } from "../common-header";

export const OrderDetailsLayout = (props: { customerId: string | null | undefined }) => {

    const form = useForm({
        defaultValues: {
            stores: ''
        }
    });

    return (
        <FormProvider {...form}>
            <CommonHeader headerName="Order Details" />

            <AllShopifyStoresContainer />
            <OrderDetailsContainer customerId={props.customerId} />
        </FormProvider>
    )
}