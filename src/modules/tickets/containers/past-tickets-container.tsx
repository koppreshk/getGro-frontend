import { CircularProgress } from "@mui/material";
import { useAppSelector } from "lib/hooks";
import { FlexBox } from "lib/ui-ux";
import { PastTicketsLayout } from "../components/ticket-details";

export const PastTicketsContainer = () => {
    const ticketDetails = useAppSelector(state => state.tickets.ticketDetails);

    if (ticketDetails === undefined) {
        return (
            <FlexBox alignItems="center" justifyContent="center" height="100%" width="100%">
                <CircularProgress />
            </FlexBox>
        )
    }

    if (ticketDetails) {
        return (
            <>
                <PastTicketsLayout pastTickets={ticketDetails.pastTickets} />
            </>
        )
    }

    return <span>Error</span>
}