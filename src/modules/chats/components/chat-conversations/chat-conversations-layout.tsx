import { FlexBox } from "lib/ui-ux"
import { ChatConversationHeader } from "./chat-conversation-header"
import { ChatConversationById } from "modules/chats/apis"
import { ConversationsWrapper } from "./conversations/conversations-wrapper";

export const ChatConversationsLayout = (props: { conversationId: string; data: ChatConversationById }) => {
    const { profile_name, profile_number } = props.data;

    return (
        <>
            <FlexBox flexDirection="column" width="100%">
                <ChatConversationHeader profile_name={profile_name} profile_number={profile_number} />
                <ConversationsWrapper data={props.data} conversationId={props.conversationId} />
            </FlexBox>
        </>
    )
}