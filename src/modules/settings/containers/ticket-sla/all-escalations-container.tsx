import { useFetchAllEscalationsNew } from "modules/settings/apis/escalations";
import { TicketEscalationLayout } from "../../component/ticket-configurations/ticket-escalation"
import { ErrorMessage } from "lib/ui-ux";

export const AllEscalationsContainer = () => {
    const { data, isLoading, error } = useFetchAllEscalationsNew();

    if (data || isLoading) {
        return (
            <>
                <TicketEscalationLayout isLoading={isLoading} allEscalations={data?.sla} totalPages={data?.total_pages ?? 0} />
            </>
        )
    }
    return <ErrorMessage statusCode={error?.message} />
}