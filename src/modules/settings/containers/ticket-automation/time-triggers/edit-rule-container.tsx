import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useEditAutoAssignment, useFetchAssignment, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation";
import { AddRule } from "modules/settings/component/ticket-automation"
import { IAddRuleFormFields } from "./add-rule-container";
import { useSearchParams } from "react-router-dom";

export const EditRuleContainer = () => {
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { data: currentRuleData, isLoading: currentRuleLoading } = useFetchAssignment();
    const { mutateAsync } = useEditAutoAssignment();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id') || '';

    const onSubmit = (formData: IAddRuleFormFields) => {
        const { ruleName, description, allTicketConditions, anyTicketConditions, assignmentMode, selectedQueue } = formData;
        const modAllConditions = allTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_all' }))
        const modAnyConditions = anyTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_any' }));

        return mutateAsync({
            id: id,
            name: ruleName,
            description,
            rules: modAllConditions.concat(modAnyConditions),
            associate_agent: {
                assignment_mode: assignmentMode,
                queue_id: selectedQueue
            }
        })
    }

    if (isLoading || currentRuleLoading) {
        return <CenteredCircularProgress />
    }

    if (data && currentRuleData) {
        const defaultValues: IAddRuleFormFields = {
            allTicketConditions: currentRuleData.rules.filter((item => item.rule_type === "type_all")).map((item) => ({ ticketFields: item.ticket_field_id.toString(), operator: item.operator_id.toString(), conditionValue: item.value })),
            anyTicketConditions: currentRuleData.rules.filter((item => item.rule_type === "type_any")).map((item) => ({ ticketFields: item.ticket_field_id.toString(), operator: item.operator_id.toString(), conditionValue: item.value })),
            assignmentMode: currentRuleData.associate_agent.assignment_mode,
            description: currentRuleData.description,
            ruleName: currentRuleData.name,
            selectedQueue: currentRuleData.associate_agent.queue_id.toString()
        }

        return (
            <AddRule data={data} onSubmit={onSubmit} defaultValues={defaultValues} mode="edit" />
        )
    }

    return <ErrorMessage />
}