import { useFetchAllStatuses } from "modules/settings/apis/ticket-status";
import { TicketStatusLayout } from "../../component/ticket-configurations/ticket-status/ticket-status-layout";
import { ErrorMessage } from "lib/ui-ux";

export const TicketStatusContainer = () => {
    const { data, isLoading, error } = useFetchAllStatuses();

    if (data || isLoading) {
        return (
            <TicketStatusLayout data={data} isLoading={isLoading} />
        )
    }
    return (
        <ErrorMessage statusCode={error?.message}/>
    )
}