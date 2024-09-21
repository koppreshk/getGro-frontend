import { useSearchParams } from "react-router-dom";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { IEscalationsNew, useEditEscalationNew, useFetchEscalationById, useFetchSLAmetaData } from "modules/settings/apis/ticket-automation/escalations";
import { AddEscalationLayout, IEscalationFormFields, ISLATargetsFormFields } from "modules/settings/component/ticket-automation/ticket-escalation/ticket-escalation-new/add-escalation-layout";
import { useNotifications } from "lib";

export const EditTicketSLAContainer = (props: { allEscalations?: IEscalationsNew[] }) => {
    const [searchParams] = useSearchParams();
    const { data, isLoading, error } = useFetchSLAmetaData();
    const id = Number(searchParams.get('id')!);
    const { data: slaDataById, isLoading: slaDataLoading, error: slaError } = useFetchEscalationById(id);
    const { mutateAsync, isLoading: mutationLoading } = useEditEscalationNew();
    const { showNotification } = useNotifications();

    const onFormSubmit = (formData: IEscalationFormFields) => {
        const { addEscalation, addReminders, chooseCondition, slaTargets, conditionsArray } = formData;

        return mutateAsync({
            id,
            name: chooseCondition.name,
            description: chooseCondition.description,
            evaluation_type: Number(chooseCondition.slaEvalutaion),
            ticket_fields: conditionsArray.map((item) => ({ id: item.ticketFields, value: item.conditionValue })),
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
                    showNotification({ message: 'SLA edited successfully', type: 'success' });
                    return
                }
                showNotification({ message: res.message, type: 'error' })
            })
            .catch(() => showNotification({ message: 'Failed to edit SLA', type: 'error' }))
    }

    if (isLoading || slaDataLoading) {
        return <CenteredCircularProgress />
    }

    if (data && slaDataById) {
        const { name, description, ticketFields, evaluationType, targets, reminder, escalations } = slaDataById.sla;
        const defaultValues = {
            chooseCondition: {
                name,
                description,
                slaEvalutaion: evaluationType.value.toString()
            },
            conditionsArray: ticketFields.map((item) => ({ ticketFields: item.field_id.toString(), condition: 'is', conditionValue: item.value.toString() })),
            slaTargets: targets.reduce((acc, curr) => {
                const priority = data.priorities.find((item) => item.id === curr.priority_id)!;
                acc[priority.name.toLocaleLowerCase()] = {
                    firstResponse: {
                        timePrefix: curr.time_to_first_response.toString(),
                        timeFields: curr.first_response_run_type_id.toString()
                    },
                    nextResponse: {
                        timePrefix: curr.time_to_next_response.toString(),
                        timeFields: curr.next_response_run_type_id.toString()
                    },
                    resolution: {
                        timePrefix: curr.time_to_resolution.toString(),
                        timeFields: curr.resolution_run_type_id.toString()
                    }
                }
                return acc;
            }, {} as ISLATargetsFormFields),
            addReminders: {
                ftrAgent: reminder.fr_user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item.toString())!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                ftrDuration: reminder.fr_reminder_id.toString(),
                ftrGroup: reminder.fr_queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item.toString())!.name })),
                ntrAgent: reminder.nr_user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item.toString())!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                ntrDuration: reminder.nr_reminder_id.toString(),
                ntrGroup: reminder.nr_queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item.toString())!.name })),
                resolutionAgent: reminder.rs_user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item.toString())!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                resolutionDuration: reminder.rs_reminder_id.toString(),
                resolutionGroup: reminder.rs_queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item.toString())!.name }))
            },
            addEscalation: {
                ftrAgent: escalations.fr_user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item.toString())!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                ftrDuration: escalations.fr_escalation_id.toString(),
                ftrGroup: escalations.fr_queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item.toString())!.name })),
                ntrAgent: escalations.nr_user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item.toString())!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                ntrDuration: escalations.nr_escalation_id.toString(),
                ntrGroup: escalations.nr_queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item.toString())!.name })),
                resolutionAgent: escalations.rs_user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item.toString())!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                resolutionDuration: escalations.rs_escalation_id.toString(),
                resolutionGroup: escalations.rs_queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item.toString())!.name }))
            }
        } as IEscalationFormFields;

        return (
            <AddEscalationLayout data={data} mode="edit" defaultvalues={defaultValues} onFormSubmit={onFormSubmit} allEscalations={props.allEscalations} mutationLoading={mutationLoading} />
        )
    }
    return <ErrorMessage statusCode={error?.message || slaError?.message} />
}