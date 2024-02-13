import { useFetchAllEscalations } from "modules/settings/apis/escalations";
import { TicketEscalationLayout } from "../../component/ticket-configurations/ticket-escalation"
import { ErrorMessage } from "lib/ui-ux";

export const TicketEscalationContainer = () => {
    const { data, isLoading, error } = useFetchAllEscalations();

    if (data || isLoading) {        
        return (
            <>
                <TicketEscalationLayout isLoading={isLoading} escalationConditions={data?.escalation_conditions || []} totalPages={data?.total_pages ?? 0}/>
            </>
        )
    }
    return <ErrorMessage statusCode={error?.message} />
}