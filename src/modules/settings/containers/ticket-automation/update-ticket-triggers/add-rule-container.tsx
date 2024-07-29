import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useCreateTicketTriggers, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation/update-ticket-triggers";
import { AddRule } from "modules/settings/component/ticket-automation/update-ticket-triggers"
import { FormProvider, useForm } from "react-hook-form"

export interface IAddRuleFormFields {
    ruleName: string;
    description: string;
    allTicketConditions: {
        operator: string;
        conditionValue: string;
        ticketFields: string;
        multiSelectConditionValue: string[];
    }[];
    anyTicketConditions: {
        operator: string;
        conditionValue: string;
        ticketFields: string;
        multiSelectConditionValue: string[];
    }[]
    assignmentMode: string;
    selectedQueue: string;
}

export const AddRuleContainer = () => {
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { mutateAsync } = useCreateTicketTriggers();

    const form = useForm<IAddRuleFormFields>({
        defaultValues: {
            allTicketConditions: [{
                ticketFields: '',
                operator: '',
                conditionValue: ''
            }],
            description: '',
            ruleName: '',
            anyTicketConditions: [],
            assignmentMode: 'even_distribution',
            selectedQueue: ''
        }
    });

    const onSubmit = (formData: IAddRuleFormFields) => {
        const { ruleName, description, allTicketConditions, anyTicketConditions, assignmentMode, selectedQueue } = formData;
        const modAllConditions = allTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_all' }))
        const modAnyConditions = anyTicketConditions.map((item) => ({ operator_id: item.operator, ticket_field_id: item.ticketFields, value: item.conditionValue, rule_type: 'type_any' }))
        return mutateAsync({
            name: ruleName,
            description,
            rules: modAllConditions.concat(modAnyConditions),
            associate_agent: {
                assignment_mode: assignmentMode,
                queue_id: selectedQueue
            }
        })
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <FormProvider {...form}>
                <AddRule data={data} onSubmit={onSubmit} />
            </FormProvider>
        )
    }

    return <ErrorMessage />
}