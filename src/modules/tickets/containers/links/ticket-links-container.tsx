import { CenteredCircularProgress } from "lib/ui-ux";
import { useLinkedTickets } from "modules/tickets/apis";
import { TicketLinks } from "modules/tickets/components/ticket-details"

export const TicketLinksContainer = () => {
    const { data, isLoading } = useLinkedTickets();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <TicketLinks data={data.linked_tickets} />
            </>
        )
    }
}