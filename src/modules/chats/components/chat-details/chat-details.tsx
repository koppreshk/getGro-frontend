import { FlexBox } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { Typography } from "@mui/material"
import { CreateAndLinkTicket } from "./create-and-link-ticket"
import { useAppSelector } from "lib/hooks"
import { ChatStatusContainer, ManageAssigneeContainer, ManagePriorityContainer, ManageTagsContainer } from "modules/chats/containers"
import { Links } from "./links"

export const ChatDetails = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);

    if (chatDetails) {
        return (
            <FlexBox gap={'10px'} flexDirection="column" justifyContent="space-between" height="100%" overflowY="auto">
                <FlexBox gap={'10px'} flexDirection="column">
                    <FlexBox gap={'10px'} padding="20px 20px 0">
                        <CustomSourceAvatar customer_name={chatDetails.customer_name} chat_source={chatDetails.chat_source} />
                        <FlexBox flexDirection="column">
                            <Typography variant="h6">{chatDetails.customer_name}</Typography>
                            <Typography variant="body3">Verified</Typography>
                        </FlexBox>
                    </FlexBox>
                    <ChatStatusContainer />
                    <ManageAssigneeContainer />
                    <ManagePriorityContainer />
                    <ManageTagsContainer />
                    {chatDetails.linked_tickets.length ? <Links /> : null}
                </FlexBox>
                <CreateAndLinkTicket />
            </FlexBox>
        )
    }
}