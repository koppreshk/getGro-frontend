import React from "react";
import { useFormContext } from "react-hook-form";
import { SelectField } from "lib/form-fields";
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { useFetchAllShopifyStores } from "modules/settings/apis/marketplace/shopify";


export const AllShopifyStoresContainer = () => {
    const { data: shopifyStoreData, isLoading: storeDataLoading } = useFetchAllShopifyStores();

    const form = useFormContext();

    React.useEffect(() => {
        if(shopifyStoreData && shopifyStoreData.length > 0) {
            form.setValue('stores', shopifyStoreData[0].id.toString());
        }
    }, [form, shopifyStoreData])

    if (storeDataLoading) {
        return <CenteredCircularProgress />;
    }

    if (shopifyStoreData) {
        return (
            <FlexBox padding="20px 10px 10px" width="100%">
                <SelectField
                    name="stores"
                    label="Stores"
                    menuOptions={shopifyStoreData.map((item) => ({ key: item.id.toString(), value: item.store_name }))}
                    size="small" sx={{ width: '100%' }} 
                    />
            </FlexBox>
        )
    }

}