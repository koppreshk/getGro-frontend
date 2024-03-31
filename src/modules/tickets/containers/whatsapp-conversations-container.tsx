import { ChatConversationLoader } from "lib/ui-ux/loader-components";
import { useFetchWhatsAppMessages } from "../apis";
import { TicketConversation } from "../components/ticket-details/ticket-conversation/ticket-conversation";
import { FlexBox } from "lib/ui-ux";

export const WhatsAppConversationContainer = () => {
    const { isLoading, data } = useFetchWhatsAppMessages();

    if (isLoading) {
        return (
            <FlexBox width="100%">
                <ChatConversationLoader />
            </FlexBox>
        )
    }

    return (
        <>
            <TicketConversation data={data!} />
        </>
    )
}