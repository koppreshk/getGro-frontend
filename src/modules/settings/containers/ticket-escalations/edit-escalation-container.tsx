import React from "react";
import { useNotifications } from "lib";
import { EscalationConditions, useEditEscalation, useFetchEscalationMetadata } from "../../apis/escalations"
import { CenteredCircularProgress } from "lib/ui-ux";
import { ITicketEscalationFormFields, TicketEscalationForm } from "modules/settings/component/ticket-configurations/ticket-escalation";

interface IEditEscalationContainerProps {
    escalationMetadata: EscalationConditions;
    toggleAddEscalationDrawer: () => void;
}

export const EditEscalationContainer = (props: IEditEscalationContainerProps) => {
    const { toggleAddEscalationDrawer, escalationMetadata } = props;
    const { data, isLoading } = useFetchEscalationMetadata();
    const { mutateAsync: editEscalation } = useEditEscalation();
    const { showNotification } = useNotifications();

    const onEditEscalation = React.useCallback((formData: ITicketEscalationFormFields) => {
        editEscalation({
            id: escalationMetadata.id,
            name: formData.name,
            after: formData.after,
            alert_time: formData.alert,
            condition: formData.conditions,
            customer_classification: formData.customerClassification,
            designation_type: formData.designationType,
            last_conversation_type: formData.lastConversationType,
            queue_list_id: formData.queues,
            status: formData.statuses,
            sub_status: formData.subStatuses,
            type_of_ticket: formData.typeOfTicket
        }).then(() => {
            showNotification({ message: 'Escalation edited successfully', type: 'success' });
            toggleAddEscalationDrawer();
        }).catch(() => showNotification({ message: 'Failed to edit the Escalation', type: 'error' }))
    }, [editEscalation, escalationMetadata.id, showNotification, toggleAddEscalationDrawer]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    const { after, conditions, queues, statuses, sub_statuses } = data!;

    return (
        <TicketEscalationForm
            mode="edit"
            onFormSubmitHandler={onEditEscalation}
            after={after}
            conditions={conditions}
            queues={queues}
            statuses={statuses}
            subStatuses={sub_statuses}
            defaultValues={{
                after: escalationMetadata.after,
                alert: escalationMetadata.alert_time,
                conditions: escalationMetadata.condition,
                name: escalationMetadata.name,
                queues: escalationMetadata.queue_list_id || '',
                statuses: escalationMetadata.status,
                subStatuses: escalationMetadata.sub_status,
                customerClassification: escalationMetadata.customer_classification || '',
                designationType: escalationMetadata.designation_type || '',
                lastConversationType: escalationMetadata.last_conversation_type || '',
                typeOfTicket: escalationMetadata.type_of_ticket || '',
                autoDispose: {
                    dispostionType: '',
                    escalateTo: '',
                    priority: ''
                },
                customEmailEscalation: {
                    customEmailTemplate: '',
                    customPhone: ''
                },
                customerEmailEscalation: {
                    customerTemplate: ''
                },
                customerSMSEscalation: {
                    customerTemplate: ''
                },
                customSMSEscalation: {
                    customPhone: '',
                    customSMSTemplate: ''
                },
                internalEmailEscalation: {
                    assignedTemplate: '',
                    creatorTemplate: '',
                    managerTemplate: '',
                    teamLeaderTemplate: ''
                },
                internalSMSEscalation: {
                    assignedTemplate: '',
                    creatorTemplate: '',
                    managerTemplate: '',
                    teamLeaderTemplate: ''
                },
                internalWebNotification: {
                    toAssignee: false,
                    toCreator: false,
                    toManager: false,
                    toTeamLeader: false
                }
            }} />
    )
}