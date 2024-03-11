import { Alert } from "@mui/material";
import { ITicketById, useTicketConversation } from "../apis";
import { TicketConversationLayout } from "../components/ticket-details/ticket-conversation"
import { FlexBox } from "lib/ui-ux";
import { EmailSkeletonLoader } from "lib/ui-ux/loader-components";
import { UseQueryResult } from "react-query";

interface ITicketConversationContainerProps {
    fetchTicketsAPIinfo: UseQueryResult<ITicketById, unknown>
}

export const TicketConversationContainer = (props: ITicketConversationContainerProps) => {
    const { isLoading, data } = useTicketConversation();
    const { data: conversationsData, isLoading: conversationLoading, isError } = props.fetchTicketsAPIinfo;

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
            <TicketConversationLayout
                data={data}
                conversationsData={conversationsData}
                isLoading={isLoading}
            />
        </>
    )
}