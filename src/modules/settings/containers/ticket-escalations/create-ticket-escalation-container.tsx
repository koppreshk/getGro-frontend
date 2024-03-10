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
            queue_list_id: formData.queues ? Number(formData.queues) : null,
            status_id: formData.statuses ? Number(formData.statuses) : null,
            sub_status_id: formData.subStatuses ? Number(formData.subStatuses) : null,
            type_of_ticket: formData.typeOfTicket,
            escalate_to: formData.autoDispose.escalateTo ? Number(formData.autoDispose.escalateTo) : null,
            priorities: formData.autoDispose.priority ? Number(formData.autoDispose.priority) : null,
            dispostion_type: formData.autoDispose.dispostionType ? Number(formData.autoDispose.dispostionType) : null,
            channel: formData.channel,
            tag: formData.tag.map((item) => item.key)
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