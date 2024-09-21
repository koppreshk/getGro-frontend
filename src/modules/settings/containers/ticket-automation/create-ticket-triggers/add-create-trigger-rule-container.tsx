import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { AutoMationType, IAllAssignments, useCreateAutoAssignment, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation/auto-assignments";
import { AddCreateTriggerRule, IAddCreateTriggerRuleFormFields } from "modules/settings/component/ticket-automation/create-ticket-triggers";
import { ICondition } from "../auto-assignments";

export const AddCreateTriggerRuleContainer = (props: {
    autoMationType: AutoMationType;
    allTriggers?: IAllAssignments[] | undefined;
}) => {
    const { autoMationType } = props;
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { mutateAsync, isLoading: mutationLoading } = useCreateAutoAssignment();

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
            name: ruleName,
            description,
            rules: modAllConditions.concat(modAnyConditions),
            automation_type: autoMationType,
            trigger_actions: actions.map((item) => ({ field_trigger_action_id: item.ticketFields, value: item.conditionValue ? { assignee_id: item.conditionValue, queue_id: item.operator } : item.operator }))
        })
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AddCreateTriggerRule data={data} onSubmit={onSubmit} allTriggers={props.allTriggers} mutationLoading={mutationLoading}/>
        )
    }

    return <ErrorMessage />
}