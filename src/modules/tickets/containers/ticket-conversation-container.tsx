import { Alert } from "@mui/material";
import { useFetchTicketById } from "../apis";
import { FlexBox } from "lib/ui-ux";
import { EmailSkeletonLoader } from "lib/ui-ux/loader-components";
import { EmailConversationLayout } from "../components/ticket-details/ticket-conversation/email-conversations/email-conversations-layout";

interface ITicketConversationContainerProps {
}

export const TicketConversationContainer = (props: ITicketConversationContainerProps) => {
    const { data: conversationsData, isLoading: conversationLoading, isError } = useFetchTicketById();

    if (conversationLoading) {
        return (
            <FlexBox width="100%">
                <EmailSkeletonLoader />
            </FlexBox>
        )
    }
    //Temp code, should be removed!
    if (conversationsData?.subject === undefined || isError) {
        return (
            <FlexBox alignItems="center" justifyContent="center" width="100%" height="100%">
                <Alert sx={{ height: 'fit-content' }} severity="error">There was an error while fetching the data, please retry later</Alert>
            </FlexBox>
        )
    }

    return (
        <>
            <EmailConversationLayout conversationsData={conversationsData} />
        </>
    )
}