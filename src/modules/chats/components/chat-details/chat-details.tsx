import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import { ManageAssigneeContainer, ManagePriorityContainer, ManageTagsContainer, TicketStatusContainer } from "modules/tickets/containers"
import { CreateAndLinkTicket } from "./create-and-link-ticket"

export const ChatDetails = () => {
    return (
        <FlexBox gap={'10px'} flexDirection="column" justifyContent="space-between" height="100%">
            <FlexBox gap={'10px'} flexDirection="column">
                <FlexBox gap={'10px'} padding="20px 20px 0">
                    <CustomSourceAvatar customer_name="Sanjay" chat_source="whatsapp" />
                    <FlexBox flexDirection="column">
                        <Typography variant="h6">Sanjay</Typography>
                        <Typography variant="body3" color={'#069454'}>Verified</Typography>
                    </FlexBox>
                </FlexBox>
                <TicketStatusContainer ticketStatus={'Open'} ticketId={45} statusUpdateString="" />
                <ManageAssigneeContainer ticketId={45} />
                <ManagePriorityContainer priority="Low" ticketId={45} />
                <ManageTagsContainer tags={[]} ticketId={45} />
            </FlexBox>
            <CreateAndLinkTicket />
        </FlexBox>
    )
}