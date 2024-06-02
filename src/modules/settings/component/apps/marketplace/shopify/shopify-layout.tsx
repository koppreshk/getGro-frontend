import { FlexBox, BreadCrumbs } from "lib/ui-ux"
import { ShopifyHeader } from "./shopify-header"
import { ShopifyContent } from "./shopify-content"

export const ShopifyLayout = () => {
    return (
        <FlexBox padding="20px" flexDirection="column" gap="20px" height="100%" >
            <BreadCrumbs />
            <ShopifyHeader />
            <ShopifyContent />
        </FlexBox>
    )
}