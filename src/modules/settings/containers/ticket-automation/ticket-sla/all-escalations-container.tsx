import { useFetchAllEscalationsNew } from "modules/settings/apis/ticket-automation/escalations";
import { ErrorMessage } from "lib/ui-ux";
import { TicketEscalationLayout } from "modules/settings/component/ticket-automation/ticket-escalation";

export default function AllEscalationsContainer() {
    const { data, isLoading, error, isFetching } = useFetchAllEscalationsNew();

    if (data || isLoading) {
        return (
            <>
                <TicketEscalationLayout isLoading={isLoading || isFetching} allEscalations={data?.sla} totalPages={data?.total_pages ?? 0} />
            </>
        )
    }
    return <ErrorMessage statusCode={error?.message} />
}