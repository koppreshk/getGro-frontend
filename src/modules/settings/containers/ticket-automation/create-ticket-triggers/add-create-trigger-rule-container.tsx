import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useCreateAutoAssignment, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation/auto-assignments";
import { AddCreateTriggerRule, IAddCreateTriggerRuleFormFields } from "modules/settings/component/ticket-automation/create-ticket-triggers";

export const AddCreateTriggerRuleContainer = () => {
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { mutateAsync } = useCreateAutoAssignment();

    const onSubmit = (formData: IAddCreateTriggerRuleFormFields) => {
        const { ruleName, description, allTicketConditions, anyTicketConditions } = formData;
        const modAllConditions = allTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_all' }))
        const modAnyConditions = anyTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_any' }))
        return mutateAsync({
            name: ruleName,
            description,
            rules: modAllConditions.concat(modAnyConditions),
            automation_type: 'create_trigger'
        })
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <AddCreateTriggerRule data={data} onSubmit={onSubmit} />
        )
    }

    return <ErrorMessage />
}