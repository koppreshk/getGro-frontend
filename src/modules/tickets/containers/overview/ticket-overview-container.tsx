import { CenteredCircularProgress } from "lib/ui-ux";
import { TicketOverview } from "../../components/ticket-details/ticket-details-section/ticket-overview/ticket-overview";
import { useAppSelector } from "lib/hooks";

export const TicketOverviewContainer = () => {
    const ticketDetails = useAppSelector(state => state.tickets.ticketDetails);

    if (ticketDetails === undefined) {
        return (
            <CenteredCircularProgress />
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