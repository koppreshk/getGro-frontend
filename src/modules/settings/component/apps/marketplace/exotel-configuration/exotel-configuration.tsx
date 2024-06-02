import { BreadCrumbs, FlexBox } from "lib/ui-ux"
import { ExotelHeader } from "./exotel-header"
import { Content } from "."

export const ExotelConfiguration = () => {
    return (
        <>
            <BreadCrumbs />
            <FlexBox flexDirection="column" gap="14px" padding="24px">
                <ExotelHeader />
                <Content />
            </FlexBox>
        </>
    )
}