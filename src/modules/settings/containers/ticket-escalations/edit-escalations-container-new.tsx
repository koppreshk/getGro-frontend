import { useSearchParams } from "react-router-dom";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchEscalationById } from "modules/settings/apis/escalations";
import { AddEscalationLayout } from "modules/settings/component/ticket-configurations/ticket-escalation/ticket-escalation-new/add-escalation-layout"

export const EditEscalationsContainerNew = () => {
    const [searchParams] = useSearchParams();
    const { data, isLoading, error } = useFetchEscalationById(Number(searchParams.get('id')!));

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AddEscalationLayout />
        )
    }
    return <ErrorMessage statusCode={error?.message}/>
}