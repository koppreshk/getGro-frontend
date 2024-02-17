import { useCreateEscalations, useFetchEscalationMetadata } from "../../apis/escalations"
import { CenteredCircularProgress } from "lib/ui-ux";
import { ITicketEscalationFormFields, TicketEscalationForm } from "../../component/ticket-configurations/ticket-escalation";
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
            name: formData.name,
            after: formData.after,
            alert_time: Number(formData.alert),
            condition: formData.conditions,
            customer_classification: formData.customerClassification,
            designation_type: formData.designationType,
            last_conversation_type: formData.lastConversationType,
            queue_list_id: Number(formData.queues),
            status_id: Number(formData.statuses),
            sub_status_id: Number(formData.subStatuses),
            type_of_ticket: formData.typeOfTicket,
            escalate_to: Number(formData.autoDispose.escalateTo),
            priorities: Number(formData.autoDispose.priority),
            dispostion_type: Number(formData.autoDispose.dispostionType)
        })
            .then((res: { status: false }) => {
                if (res.status) {
                    showNotification({ message: 'Escalation was created successfully', type: 'success' });
                }
                else {
                    return Promise.reject('err')
                }
            })
            .catch(() => showNotification({ message: 'Failed to create the escalaltion', type: 'error' }))
            .finally(() => props.toggleAddEscalationDrawer())
    }, [mutateAsync, props, showNotification])

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <>
                <TicketEscalationForm {...data} mode="create" onFormSubmitHandler={onAddEscalation} />
            </>
        )
    }
}