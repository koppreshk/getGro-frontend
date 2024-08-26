import { CenteredCircularProgress } from "lib/ui-ux";
import { useTicketsHistory } from "modules/tickets/apis";
import { EmailHistory } from "modules/tickets/components/ticket-details"

export const EmailHistoryContainer = () => {
    const { data, isLoading } = useTicketsHistory();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <EmailHistory data={data} />
            </>
        )
    }
}