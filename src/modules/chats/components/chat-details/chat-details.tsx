import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { CustomSourceAvatar } from "../chat-list/custom-source-avatar"
import { CreateAndLinkTicket } from "./create-and-link-ticket"
import { useAppSelector, useFeature } from "lib/hooks"
import { ChatStatusContainer, ManageAssigneeContainer, ManagePriorityContainer, ManageTagsContainer } from "modules/chats/containers"
import { Links } from "./links"
import { LinkTicket } from "./link-ticket"
import { ChatSubHeading } from "../chat-conversations/chat-conversation-header"


export const ChatDetails = () => {
    const chatDetails = useAppSelector((state) => state.chat.chatDetails);
    const isFeatureAccessible = useFeature<undefined>();

    if (chatDetails) {
        return (
            <FlexBox gap={'10px'} flexDirection="column" justifyContent="space-between" height="100%" overflowY="auto">
                <FlexBox gap={'10px'} flexDirection="column">
                    <FlexBox gap={'10px'} padding="10px 20px 0" alignItems="center">
                        <CustomSourceAvatar customer_name={chatDetails.customer_name} chat_source={chatDetails.chat_source} chat_type={chatDetails?.chat_type ?? ''} />
                        <ChatSubHeading profileNumber="" isPostVisible />
                    </FlexBox>
                    {isFeatureAccessible('edit_conversation_status') ? <ChatStatusContainer /> : null}
                    {isFeatureAccessible('edit_conversation_assignee') ? <ManageAssigneeContainer /> : null}
                    {isFeatureAccessible('edit_conversation_priority') ? <ManagePriorityContainer /> : null}
                    {isFeatureAccessible('edit_conversation_tags') ? <ManageTagsContainer /> : null}
                    {chatDetails.linked_tickets.length ? <Links /> : null}
                </FlexBox>
                <FlexBox justifyContent="space-between" padding="0 20px">
                    {isFeatureAccessible('create_link_conversation_ticket') ? <CreateAndLinkTicket /> : null}
                    <VerticalSeparator />
                    {isFeatureAccessible('link_conversation_ticket') ? <LinkTicket /> : null}
                </FlexBox>
            </FlexBox>
        )
    }
}