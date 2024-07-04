/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert } from "@mui/material";
import { useFetchTicketById } from "../apis";
import { FlexBox } from "lib/ui-ux";
import { EmailSkeletonLoader } from "lib/ui-ux/loader-components";
import { EmailConversationLayout } from "../components/ticket-details/ticket-conversation/email-conversations/email-conversations-layout";

interface IEmailConversationContainerProps {
}

export const EmailConversationContainer = (_props: IEmailConversationContainerProps) => {
    const { data: conversationsData, isLoading: conversationLoading, isError, refetch } = useFetchTicketById();

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

    const fetchNewThreads = () => {
        refetch();
    }

    return (
        <>
            <EmailConversationLayout conversationsData={conversationsData} fetchNewThreads={fetchNewThreads} />
        </>
    )
}