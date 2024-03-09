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
            queue_list_id: Number(formData.queues),
            status_id: Number(formData.statuses),
            sub_status_id: Number(formData.subStatuses),
            type_of_ticket: formData.typeOfTicket,
            escalate_to: Number(formData.autoDispose.escalateTo),
            priorities: Number(formData.autoDispose.priority),
            disposition_type: Number(formData.autoDispose.dispostionType),
            tag: formData.tag.map((item) => item.key),
            channel: formData.channel,
        }).then((res: { status: false }) => {
            if (res.status) {
                showNotification({ message: 'Escalation edited successfully', type: 'success' });
            }
            else {
                return Promise.reject('err')
            }
        })
            .catch(() => showNotification({ message: 'Failed to edit the Escalation', type: 'error' }))
            .finally(() => toggleAddEscalationDrawer())
    }, [editEscalation, escalationMetadata.id, showNotification, toggleAddEscalationDrawer]);

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    const { after, conditions, queues, statuses, sub_statuses, escalate_to, priorities, channels } = data!;

    return (
        <TicketEscalationForm
            mode="edit"
            onFormSubmitHandler={onEditEscalation}
            after={after}
            conditions={conditions}
            queues={queues}
            statuses={statuses}
            sub_statuses={sub_statuses}
            escalate_to={escalate_to}
            channels={channels}
            priorities={priorities}
            defaultValues={{
                after: escalationMetadata.after,
                alert: escalationMetadata.alert_time,
                conditions: escalationMetadata.condition,
                name: escalationMetadata.name,
                queues: escalationMetadata.queue_list_id || '',
                statuses: statuses.find((item) => escalationMetadata.status === item.name)!.id!,
                subStatuses: sub_statuses.find((item) => escalationMetadata.sub_status === item.name)!.id!,
                customerClassification: escalationMetadata.customer_classification || '',
                designationType: escalationMetadata.designation_type || '',
                lastConversationType: escalationMetadata.last_conversation_type || '',
                typeOfTicket: escalationMetadata.type_of_ticket || '',
                channel: escalationMetadata.channel,
                tag: channels.find((item) => item.channel_id === Number(escalationMetadata.channel))?.tags!.map((item) => ({ key: item.tag_id.toString(), value: item.tag })) || [],
                autoDispose: {
                    dispostionType: escalationMetadata.disposition_type,
                    escalateTo: escalationMetadata.escalate_to,
                    priority: escalationMetadata.priority
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