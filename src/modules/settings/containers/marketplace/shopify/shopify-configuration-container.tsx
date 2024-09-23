import { useFetchAllShopifyStores } from "modules/settings/apis/marketplace/shopify";
import { CenteredCircularProgress } from "lib/ui-ux";
import { ShopifyConfiguration } from "modules/settings/component/apps/marketplace/shopify";

export const ShopifyConfigurationContainer = () => {
    const { data, isLoading } = useFetchAllShopifyStores();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <ShopifyConfiguration data={data}/>
    }

    return (
        <span>Error</span>
    )
}