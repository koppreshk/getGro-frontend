import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useEditAutoAssignment, useFetchAssignment, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation/auto-assignments";
import { useSearchParams } from "react-router-dom";
import { AddCreateTriggerRule, IAddCreateTriggerRuleFormFields } from "modules/settings/component/ticket-automation/create-ticket-triggers";
import { isArray } from "lib/utils";

export const EditCreateTriggerRuleContainer = () => {
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { data: currentRuleData, isLoading: currentRuleLoading } = useFetchAssignment('create_trigger');
    const { mutateAsync } = useEditAutoAssignment();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const onSubmit = (formData: IAddCreateTriggerRuleFormFields) => {
        const { ruleName, description, allTicketConditions, anyTicketConditions } = formData;
        const modAllConditions = allTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_all' }))
        const modAnyConditions = anyTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_any' }));

        return mutateAsync({
            id: id,
            name: ruleName,
            description,
            rules: modAllConditions.concat(modAnyConditions),
            automation_type: 'create_trigger'
        })
    }

    if (isLoading || currentRuleLoading) {
        return <CenteredCircularProgress />
    }

    if (data && currentRuleData) {
        const defaultValues: IAddCreateTriggerRuleFormFields = {
            allTicketConditions: currentRuleData.rules.filter((item => item.rule_type === "type_all")).map((item) => {
                const parsedCondtValue = isArray(item.value) ? { multiSelectConditionValue: item.value.map((i) => i.toString()), conditionValue: '' } : { conditionValue: item.value, multiSelectConditionValue: [] }
                return {
                    ticketFields: item.ticket_field_id.toString(),
                    operator: item.operator_id.toString(),
                    ...parsedCondtValue
                }
            }
            ),
            anyTicketConditions: currentRuleData.rules.filter((item => item.rule_type === "type_any")).map((item) => {
                const parsedCondtValue = isArray(item.value) ? { multiSelectConditionValue: item.value.map((i) => i.toString()), conditionValue: '' } : { conditionValue: item.value, multiSelectConditionValue: [] }
                return {
                    ticketFields: item.ticket_field_id.toString(),
                    operator: item.operator_id.toString(),
                    ...parsedCondtValue
                }
            }
            ),
            description: currentRuleData.description,
            ruleName: currentRuleData.name,
            actions: currentRuleData.trigger_actions.map((item) => ({
                ticketFields: item.field_trigger_action_id,
                operator: typeof item.value === 'string' ? item.value : item.value.queue_id,
                conditionValue: typeof item.value !== 'string' ? item.value.assignee_id : undefined
            }))
        }

        return (
            <AddCreateTriggerRule data={data} onSubmit={onSubmit} defaultValues={defaultValues} mode="edit" />
        )
    }

    return <ErrorMessage />
}