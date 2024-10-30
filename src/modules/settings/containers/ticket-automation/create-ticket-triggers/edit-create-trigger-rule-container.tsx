import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { AutoMationType, IAllAssignments, useEditAutoAssignment, useFetchAssignment, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation/auto-assignments";
import { useSearchParams } from "react-router-dom";
import { AddCreateTriggerRule, IAddCreateTriggerRuleFormFields } from "modules/settings/component/ticket-automation/create-ticket-triggers";
import { isArray } from "lib/utils";
import { ICondition } from "../auto-assignments";

export const EditCreateTriggerRuleContainer = (props: {
    autoMationType: AutoMationType;
    allTriggers?: IAllAssignments[] | undefined;
}) => {
    const { autoMationType } = props;
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { data: currentRuleData, isLoading: currentRuleLoading } = useFetchAssignment('create_trigger');
    const { mutateAsync, isLoading: mutationLoading } = useEditAutoAssignment();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const onSubmit = (formData: IAddCreateTriggerRuleFormFields) => {
        const { ruleName, description, allTicketConditions, anyTicketConditions, actions } = formData;
        const sourceArray = data!.find((item) => item.fieldName.toLocaleLowerCase() === 'source');

        const getIFMultiSelectOperatorsSelected = (item: ICondition) => {
            const isInOperatorSelected = sourceArray!.operators.find((it) => it.operatorName.toLocaleLowerCase() === 'in')!.operatorId.toString() === item.operator.toString();
            const isNotInOperatorSelected = sourceArray?.operators.find((it) => it.operatorName.toLocaleLowerCase() === 'not in')?.operatorId.toString() === item.operator.toString();
            return { isInOperatorSelected, isNotInOperatorSelected }
        }

        const modAllConditions = allTicketConditions.map((item) => {
            const { isInOperatorSelected, isNotInOperatorSelected } = getIFMultiSelectOperatorsSelected(item)

            return {
                operator_id: item.operator,
                ticket_field_id: item.ticketFields,
                value: isInOperatorSelected || isNotInOperatorSelected ? item.multiSelectConditionValue : item.conditionValue,
                rule_type: 'type_all'
            }
        })
        const modAnyConditions = anyTicketConditions.map((item) => {
            const { isInOperatorSelected, isNotInOperatorSelected } = getIFMultiSelectOperatorsSelected(item)

            return {
                operator_id: item.operator,
                ticket_field_id: item.ticketFields,
                value: isInOperatorSelected || isNotInOperatorSelected ? item.multiSelectConditionValue : item.conditionValue,
                rule_type: 'type_any'
            }
        });

        return mutateAsync({
            id: id,
            name: ruleName,
            description,
            rules: modAllConditions.concat(modAnyConditions),
            automation_type: autoMationType,
            trigger_actions: actions.map((item) => ({ field_trigger_action_id: item.ticketFields, value: item.conditionValue ? { assignee_id: item.conditionValue, queue_id: item.operator } : item.operator }))
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
                ticketFields: item.field_trigger_action_id.toString(),
                operator: typeof item.value === 'string' ? item.value : item.value.queue_id,
                conditionValue: typeof item.value !== 'string' ? item.value.assignee_id : undefined
            }))
        }

        return (
            <AddCreateTriggerRule data={data} onSubmit={onSubmit} defaultValues={defaultValues} mode="edit" allTriggers={props.allTriggers} mutationLoading={mutationLoading} />
        )
    }

    return <ErrorMessage />
}