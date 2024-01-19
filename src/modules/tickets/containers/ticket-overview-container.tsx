import { CircularProgress } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { TicketOverview } from "../components/ticket-details/ticket-details-section/ticket-overview/ticket-overview";
import { useAppSelector } from "lib/hooks";

export const TicketOverviewContainer = () => {
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
                <TicketOverview ticketDetails={ticketDetails} />
            </>
        )
    }

    return <span>Error</span>
}