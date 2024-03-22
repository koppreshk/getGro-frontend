import { EmailSkeletonLoader } from "lib/ui-ux/loader-components";
import { useTicketConversation } from "../apis";
import { TicketConversation } from "../components/ticket-details/ticket-conversation/ticket-conversation";
import { FlexBox } from "lib/ui-ux";

export const WhatsAppConversationContainer = () => {
    const { isLoading, data } = useTicketConversation();

    if (isLoading) {
        return (
            <FlexBox width="100%">
                <EmailSkeletonLoader />
            </FlexBox>
        )
    }

    return (
        <>
            <TicketConversation data={data} isLoading={isLoading} />
        </>
    )
}