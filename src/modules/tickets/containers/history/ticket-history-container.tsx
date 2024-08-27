import { CenteredCircularProgress } from "lib/ui-ux";
import { useTicketsHistory } from "modules/tickets/apis";
import { TicketHistory } from "modules/tickets/components/ticket-details"

export const TicketHistoryContainer = () => {
    const { data, isLoading } = useTicketsHistory();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <TicketHistory data={data} />
            </>
        )
    }
}