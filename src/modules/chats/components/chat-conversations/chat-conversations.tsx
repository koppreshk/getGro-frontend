import { FlexBox } from "lib/ui-ux"
import { ChatConversationHeader } from "./chat-conversation-header"
import { ChatConversationById } from "modules/chats/apis"
import { WhatsAppConversations } from "./whatsapp-conversations";

export const ChatConversations = (props: { data: ChatConversationById }) => {
    const { profile_name, profile_number } = props.data;

    return (
        <>
            <FlexBox flexDirection="column" width="100%">
                <ChatConversationHeader profile_name={profile_name} profile_number={profile_number} />
                <WhatsAppConversations data={props.data} isDisabled />
            </FlexBox>
        </>
    )
}