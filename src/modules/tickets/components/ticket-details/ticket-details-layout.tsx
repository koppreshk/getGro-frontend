import { FlexBox } from "lib/ui-ux"
import { TicketListViewContainer } from "modules/tickets/containers"

export const TicketDetailsLayout = () => {
    return (
        <FlexBox $width="100%" $height="100%">
            <FlexBox $width="25%" style={{ borderRight: '1px solid #e9ebed' }}>
                <TicketListViewContainer />
            </FlexBox>
            <FlexBox $width="40%" $justifyContent="center" $alignItems="center" style={{ borderRight: '1px solid #e9ebed' }}>Chat History</FlexBox>
            <FlexBox $width="35%" $justifyContent="center" $alignItems="center"> Ticket Details</FlexBox>
        </FlexBox>
    )
} 