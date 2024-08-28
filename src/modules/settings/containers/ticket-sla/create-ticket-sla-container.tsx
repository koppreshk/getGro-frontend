import { useNotifications } from "lib";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { IEscalationsNew, useCreateEscalationNew, useFetchSLAmetaData } from "modules/settings/apis/escalations"
import { AddEscalationLayout, IEscalationFormFields } from "modules/settings/component/ticket-configurations/ticket-escalation/ticket-escalation-new/add-escalation-layout";

export const CreateTicketSLAContainer = (props: { allEscalations?: IEscalationsNew[] }) => {
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
                fr_queue_ids: addReminders.ftrGroup.map((item) => item.key),
                fr_user_ids: addReminders.ftrAgent.map((item) => item.key),
                nr_queue_ids: addReminders.ntrGroup.map((item) => item.key),
                nr_user_ids: addReminders.ntrAgent.map((item) => item.key),
                rs_queue_ids: addReminders.resolutionGroup.map((item) => item.key),
                rs_user_ids: addReminders.resolutionAgent.map((item) => item.key),
            },
            escalations: {
                fr_escalation_id: addEscalation.ftrDuration,
                nr_escalation_id: addEscalation.ntrDuration,
                rs_escalation_id: addEscalation.resolutionDuration,
                fr_queue_ids: addEscalation.ftrGroup.map((item) => item.key),
                fr_user_ids: addEscalation.ftrAgent.map((item) => item.key),
                nr_queue_ids: addEscalation.ntrGroup.map((item) => item.key),
                nr_user_ids: addEscalation.ntrAgent.map((item) => item.key),
                rs_queue_ids: addEscalation.resolutionGroup.map((item) => item.key),
                rs_user_ids: addEscalation.resolutionAgent.map((item) => item.key),
            }
        })
            .then((res) => {
                if (res.status) {
                    showNotification({ message: 'SLA created successfully', type: 'success' });
                    return
                }
                showNotification({ message: res.message, type: 'error' })
            })
            .catch(() => showNotification({ message: 'Failed to create SLA', type: 'error' }))
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return <AddEscalationLayout data={data} onFormSubmit={onFormSubmit} allEscalations={props.allEscalations} />
    }

    return <ErrorMessage statusCode={error?.message} />
} 