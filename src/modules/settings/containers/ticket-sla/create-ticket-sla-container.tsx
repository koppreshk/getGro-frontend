import { useNotifications } from "lib";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useCreateEscalationNew, useFetchSLAmetaData } from "modules/settings/apis/escalations"
import { AddEscalationLayout, IEscalationFormFields } from "modules/settings/component/ticket-configurations/ticket-escalation/ticket-escalation-new/add-escalation-layout";

export const CreateTicketSLAContainer = () => {
    const { data, isLoading, error } = useFetchSLAmetaData();
    const { mutateAsync } = useCreateEscalationNew();
    const { showNotification } = useNotifications();

    const onFormSubmit = (formData: IEscalationFormFields) => {
        const { addEscalation, addReminders, chooseCondition, slaTargets } = formData;

        return mutateAsync({
            name: chooseCondition.name,
            description: chooseCondition.description,
            evaluation_type: Number(chooseCondition.slaEvalutaion),
            ticket_fields: [
                { id: chooseCondition.ticketFields, value: chooseCondition.conditionValue },
            ],
            targets: data!.priorities.map((item) => (
                {
                    priority_id: item.id,
                    time_to_first_response: slaTargets[item.name.toLocaleLowerCase()].firstResponse.timePrefix,
                    time_to_next_response: slaTargets[item.name.toLocaleLowerCase()].nextResponse.timePrefix,
                    time_to_resolution: slaTargets[item.name.toLocaleLowerCase()].nextResponse.timePrefix,
                    first_response_run_type_id: slaTargets[item.name.toLocaleLowerCase()].firstResponse.timeFields,
                    next_response_run_type_id: slaTargets[item.name.toLocaleLowerCase()].nextResponse.timeFields,
                    resolution_run_type_id: slaTargets[item.name.toLocaleLowerCase()].resolution.timeFields
                }
            )),
            reminder: {
                fr_reminder_id: addReminders.ftrDuration,
                nr_reminder_id: addReminders.ntrDuration,
                rs_reminder_id: addReminders.resolutionDuration,
                queue_ids: addReminders.ftrGroup.map((item) => item.key),
                user_ids: addReminders.ftrAgent.map((item) => item.key)
            },
            escalations: {
                fr_escalation_id: addEscalation.ftrDuration,
                nr_escalation_id: addEscalation.ntrDuration,
                rs_escalation_id: addEscalation.resolutionDuration,
                queue_ids: addEscalation.ftrGroup.map((item) => item.key),
                user_ids: addEscalation.ftrAgent.map((item) => item.key)
            }
        })
            .then(() => showNotification({ message: 'SLA created successfully', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to create SLA', type: 'error' }))
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <AddEscalationLayout data={data} onFormSubmit={onFormSubmit} />
    }

    return <ErrorMessage statusCode={error?.message} />
} 