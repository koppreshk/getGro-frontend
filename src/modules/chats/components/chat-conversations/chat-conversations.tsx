import { FlexBox } from "lib/ui-ux"
import { IWhatsAppMessages } from "modules/tickets/apis"
import { WhatsAppConversations } from "modules/tickets/components/ticket-details/ticket-conversation/whatsapp-conversations"
import { ChatConversationHeader } from "./chat-conversation-header"

export const ChatConversations = () => {
    const data = {
        ticket_id: 1,
        customer_name: 'Sam',
        agent_name: 'Tom',
        conversations: [{
            created_at: '10-01-2024T12:56:45z',
            delivered: true,
            is_agent_sent: false,
            message: 'Hi',
            message_id: '123',
            message_type: '',
            read: false
        }]
    } as IWhatsAppMessages

    return (
        <>
            <FlexBox flexDirection="column" width="100%">
                <ChatConversationHeader />
                <div style={{ height: 'calc(100% - 54px)' }}>
                    <WhatsAppConversations data={data} isDisabled />
                </div>
            </FlexBox>
        </>
    )
}