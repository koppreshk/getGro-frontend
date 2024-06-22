import { useSearchParams } from "react-router-dom";
import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { IKeyValue, useFetchEscalationById, useFetchSLAmetaData } from "modules/settings/apis/escalations";
import { AddEscalationLayout, IEscalationFormFields, ISLATargetsFormFields } from "modules/settings/component/ticket-configurations/ticket-escalation/ticket-escalation-new/add-escalation-layout";

export const EditTicketSLAContainer = () => {
    const [searchParams] = useSearchParams();
    const { data, isLoading, error } = useFetchSLAmetaData();
    const { data: slaDataById, isLoading: slaDataLoading, error: slaError } = useFetchEscalationById(Number(searchParams.get('id')!));

    const onFormSubmit = async(formData: IEscalationFormFields) => {
        console.log(formData);
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
                ticketFields: ticketFields[0].field_id.toString(),
                condition: 'is',
                conditionValue: ticketFields[0].value.toString(),
                slaEvalutaion: evaluationType.value.toString()
            },
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
                ftrAgent: reminder.user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item)!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                ftrDuration: reminder.fr_reminder_id.toString(),
                ftrGroup: reminder.queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item)!.name })),
                ntrAgent: [] as IKeyValue[],
                ntrDuration: reminder.nr_reminder_id.toString(),
                ntrGroup: [] as IKeyValue[],
                resolutionAgent: [] as IKeyValue[],
                resolutionDuration: reminder.rs_reminder_id.toString(),
                resolutionGroup: [] as IKeyValue[]
            },
            addEscalation: {
                ftrAgent: escalations.user_ids.map((item) => {
                    const valueObj = data.user_list.find(q => q.id.toString() === item)!;
                    return { key: item.toString(), value: `${valueObj.firstName} ${valueObj.lastName ?? ''}` }
                }),
                ftrDuration: escalations.fr_escalation_id.toString(),
                ftrGroup: escalations.queue_ids.map((item) => ({ key: item.toString(), value: data.queue_list.find(q => q.id.toString() === item)!.name })),
                ntrAgent: [] as IKeyValue[],
                ntrDuration: escalations.nr_escalation_id.toString(),
                ntrGroup: [] as IKeyValue[],
                resolutionAgent: [] as IKeyValue[],
                resolutionDuration: escalations.rs_escalation_id.toString(),
                resolutionGroup: [] as IKeyValue[]
            }
        } as IEscalationFormFields;

        return (
            <AddEscalationLayout data={data} mode="edit" defaultvalues={defaultValues} onFormSubmit={onFormSubmit} />
        )
    }
    return <ErrorMessage statusCode={error?.message || slaError?.message} />
}