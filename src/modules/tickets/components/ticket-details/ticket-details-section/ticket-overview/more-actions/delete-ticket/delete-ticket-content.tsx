import { FlexBox, MoreInformation } from "lib/ui-ux"

export const DeleteTicketContent = () => {
    return (
        <FlexBox flexDirection="column" gap={'10px'}>
            <MoreInformation information="When you delete a ticket, the following actions will happen" type="error" />
            <ul>
                <li style={{ marginBottom: '5px' }}>The ticket will be soft deleted.</li>
                <li>The ticket can be restored within 30 days from the Deleted Tickets view.</li>
            </ul>
        </FlexBox>
    )
}