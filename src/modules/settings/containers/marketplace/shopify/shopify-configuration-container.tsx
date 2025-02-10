import { CenteredCircularProgress, ErrorMessage } from 'lib/ui-ux';
import { useFetchAllShopifyStores } from 'modules/settings/apis/marketplace/shopify';
import { ShopifyConfiguration } from 'modules/settings/component/apps/marketplace/shopify';

export const ShopifyConfigurationContainer = () => {
  const { data, isLoading, error } = useFetchAllShopifyStores();

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  if (data) {
    return <ShopifyConfiguration data={data} />;
  }

  return <ErrorMessage statusCode={error?.message} />;
};
