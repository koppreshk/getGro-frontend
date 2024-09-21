import { SelectField } from "lib/form-fields";
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";

interface IAllShopifyStoresContainerProps {
    shopifyStoreData: IShopifyStore[] | undefined;
    storeDataLoading: boolean
}

export const AllShopifyStoresContainer = (props: IAllShopifyStoresContainerProps) => {
    const { shopifyStoreData, storeDataLoading } = props

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
                    size="small" sx={{ width: '100%' }} />
            </FlexBox>
        )
    }

}