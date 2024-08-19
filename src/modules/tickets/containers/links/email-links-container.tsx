import { CenteredCircularProgress } from "lib/ui-ux";
import { useLinkedTickets } from "modules/tickets/apis";
import { EmailLinks } from "modules/tickets/components/ticket-details"

export const EmailLinksContainer = () => {
    const { data, isLoading } = useLinkedTickets();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <EmailLinks data={data.linked_tickets} />
            </>
        )
    }
}