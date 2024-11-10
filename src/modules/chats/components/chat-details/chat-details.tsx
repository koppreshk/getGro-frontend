import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import { ManageAssigneeContainer, ManageTagsContainer } from "modules/tickets/containers"
import { CreateAndLinkTicket } from "./create-and-link-ticket"
import { useAppSelector } from "lib/hooks"
import { ChatStatusContainer, ManagePriorityContainer } from "modules/chats/containers"

export const ChatDetails = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    if (chatDetails) {
        return (
            <FlexBox gap={'10px'} flexDirection="column" justifyContent="space-between" height="100%">
                <FlexBox gap={'10px'} flexDirection="column">
                    <FlexBox gap={'10px'} padding="20px 20px 0">
                        <CustomSourceAvatar customer_name={chatDetails.customer_name} chat_source={chatDetails.chat_source} />
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">{chatDetails.customer_name}</Typography>
                            <Typography variant="body3">Verified</Typography>
                        </FlexBox>
                    </FlexBox>
                    <ChatStatusContainer />
                    <ManageAssigneeContainer ticketId={45} />
                    <ManagePriorityContainer />
                    <ManageTagsContainer tags={[]} ticketId={45} />
                </FlexBox>
                <CreateAndLinkTicket />
            </FlexBox>
        )
    }
}