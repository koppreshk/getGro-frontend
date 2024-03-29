import { FlexBox } from "lib/ui-ux";
import { useTicketConversation } from "../apis";
import { EmailSkeletonLoader } from "lib/ui-ux/loader-components";
import { FacebookConversation } from "../components/ticket-details/ticket-conversation/facebook-conversation";

export const FacebookConversationsContainer = () => {
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
            <FacebookConversation data={data} isLoading={isLoading} />
        </>
    )
}