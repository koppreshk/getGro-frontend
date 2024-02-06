import { useCreateEscalations, useFetchEscalationMetadata } from "../apis/escalations"
import { CenteredCircularProgress } from "lib/ui-ux";
import { CreateTicketEscalation, ITicketEscalationFormFields } from "../component/ticket-configurations/ticket-escalation";
import { useCallback } from "react";
import { useNotifications } from "lib";

interface ICreateTicketEscalationContainerProps {
    toggleAddEscalationDrawer: () => void;
}

export const CreateTicketEscalationContainer = (props: ICreateTicketEscalationContainerProps) => {
    const { data, isLoading } = useFetchEscalationMetadata();
    const { mutateAsync } = useCreateEscalations();
    const { showNotification } = useNotifications();

    const onAddEscalation = useCallback((formData: ITicketEscalationFormFields) => {
        mutateAsync({
            after: formData.after,
            alertTime: Number(formData.alert),
            condition: formData.conditions,
            name: formData.name,
            status: formData.statuses,
            subStatus: formData.subStatuses
        })
            .then(() => {
                props.toggleAddEscalationDrawer();
                showNotification({ message: 'Escalation was created successfully', type: 'success' });
            }).catch(() => showNotification({ message: 'Failed to create the escalaltion', type: 'error' }))
    }, [mutateAsync, props, showNotification])

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <CreateTicketEscalation {...data} subStatuses={data.sub_statuses} onAddEscalation={onAddEscalation} />
            </>
        )
    }
}