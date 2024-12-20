import { Typography } from '@mui/material';
import { SelectField } from 'lib/form-fields';
import { FlexBox } from 'lib/ui-ux';
import { IShopifyStore } from 'modules/settings/apis/marketplace/shopify';

export const SelectShopifyStore = (props: {
  shopifyStoreData: IShopifyStore[];
}) => {
  const { shopifyStoreData } = props;

  if (!shopifyStoreData || shopifyStoreData.length === 0) {
    return (
      <FlexBox padding="20px 10px 10px" width="100%">
        <Typography>No stores found.</Typography>
      </FlexBox>
    );
  }

  return (
    <FlexBox padding="10px" width="100%" flexDirection="column" gap="5px">
      <Typography variant="h6">Stores</Typography>
      <SelectField
        name="stores"
        menuOptions={shopifyStoreData.map((item) => ({
          key: item.id.toString(),
          value: item.store_name,
        }))}
        size="small"
        sx={{ width: '100%' }}
      />
    </FlexBox>
  );
};
