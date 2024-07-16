import { AddShopifyStoreForm } from "modules/settings/component/apps/marketplace/shopify";

export const AddShopifyConfigContainer = (props: { togglePopup: () => void; }) => {
    return (
        <AddShopifyStoreForm togglePopup={props.togglePopup} />
    )
}