// import { useFetchAllEscalations } from "modules/settings/apis/escalations";
import { TicketEscalationLayout } from "../../component/ticket-configurations/ticket-escalation"
// import { ErrorMessage } from "lib/ui-ux";

export const TicketEscalationContainer = () => {
    //Temp code: w'll call api later as its breaking 
    // const { data, isLoading, error } = useFetchAllEscalations();

    const data = {
        escalation_conditions: [],
        total_pages: 0
    }
    // if (data || isLoading) {        
    return (
        <>
            <TicketEscalationLayout isLoading={false} escalationConditions={data?.escalation_conditions || []} totalPages={data?.total_pages ?? 0} />
        </>
    )
    // }
    // return <ErrorMessage statusCode={error?.message} />
}