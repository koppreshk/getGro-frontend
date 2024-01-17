import { Alert, CircularProgress } from "@mui/material";
import { useFetchTicketById, useGetTicketDetailsById, useTicketConversation } from "../apis";
import { TicketConversationLayout } from "../components/ticket-details/ticket-conversation"
import { FlexBox } from "lib/ui-ux";

export const TicketConversationContainer = () => {
    const { isLoading, data } = useTicketConversation();
    const { data: ticketDetailsById, isLoading: ticketDetailsLoading } = useGetTicketDetailsById();
    const { data: conversationsData, isLoading: conversationLoading, isError } = useFetchTicketById();

    if (conversationLoading) {
        return (
            <FlexBox alignItems="center" justifyContent="center" width="100%" height="100%">
                <CircularProgress />
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
                isLoading={isLoading || conversationLoading || ticketDetailsLoading}
                ticketDetailsById={ticketDetailsById} />
        </>
    )
}