import { SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Typography } from "@mui/material";
import { IShopifyStore } from "modules/settings/apis/marketplace/shopify";


export const SelectShopifyStore = (props: { shopifyStoreData: IShopifyStore[] }) => {
    const { shopifyStoreData } = props;

    if (!shopifyStoreData || shopifyStoreData.length === 0) {
        return (
            <FlexBox padding="20px 10px 10px" width="100%">
                <Typography>No stores found.</Typography>
            </FlexBox>
        );
    }

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