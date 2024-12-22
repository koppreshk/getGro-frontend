import { useFetchAllShopifyStores } from 'modules/settings/apis/marketplace/shopify';
import { ShopifyStoreList } from 'modules/settings/component/apps/marketplace/shopify';

export const ManageShopifyStoreContainer = () => {
  const { data, isLoading } = useFetchAllShopifyStores();

  if (data || isLoading) {
    return <ShopifyStoreList data={data} isLoading={isLoading} />;
  }
};
