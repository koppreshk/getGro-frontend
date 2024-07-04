import { FlexBox } from "lib/ui-ux";
import { useTicketConversation } from "../../../apis";
import { EmailSkeletonLoader } from "lib/ui-ux/loader-components";
import { InstagramConversation } from "../../../components/ticket-details/ticket-conversation/instagram-conversations/instagram-conversation";

export const InstagramConversationsContainer = () => {
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
            <InstagramConversation data={data} isLoading={isLoading} />
        </>
    )
}