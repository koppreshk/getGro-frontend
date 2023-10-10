import { FlexBox } from "lib/ui-ux"

export const TicketDetailsLayout = () => {
    return (
        <FlexBox $width="100%" $height="100%">
            <FlexBox $width="400px" $justifyContent="center" $alignItems="center" style={{border: '1px solid black'}}>List View of tickets</FlexBox>
            <FlexBox $width="500px" $justifyContent="center" $alignItems="center" style={{border: '1px solid black'}}>Chat History</FlexBox>
            <FlexBox $width="calc(100% - 906px)" $justifyContent="center" $alignItems="center" style={{border: '1px solid black'}}>Everything else</FlexBox>
        </FlexBox>
    )
} 