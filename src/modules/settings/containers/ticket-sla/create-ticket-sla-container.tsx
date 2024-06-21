import { CenteredCircularProgress } from "lib/ui-ux";
import { useFetchSLAmetaData } from "modules/settings/apis/escalations"
import { AddEscalationLayout } from "modules/settings/component/ticket-configurations/ticket-escalation/ticket-escalation-new/add-escalation-layout";

export const CreateTicketSLAContainer = () => {
    const { data, isLoading, error } = useFetchSLAmetaData();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <AddEscalationLayout data={data} />
    }

    <span>Error: {error as string}</span>
} 