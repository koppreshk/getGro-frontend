import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { IAllAssignments, useCreateAutoAssignment, useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation";
import { AddRule } from "modules/settings/component/ticket-automation"
import { FormProvider, useForm } from "react-hook-form"

export interface ICondition {
    operator: string;
    conditionValue: string;
    ticketFields: string;
    multiSelectConditionValue: string[]
}

export interface IAddRuleFormFields {
    ruleName: string;
    description: string;
    allTicketConditions: ICondition[];
    anyTicketConditions: ICondition[]
    assignmentMode: string;
    selectedQueue: string;
}

export const AddRuleContainer = (props: { allAssignments?: IAllAssignments[] }) => {
    const { data, isLoading } = useFetchFieldsAndConditions();
    const { mutateAsync, isLoading: mutationLoading } = useCreateAutoAssignment();

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
            associate_agent: {
                assignment_mode: assignmentMode,
                queue_id: selectedQueue
            },
            automation_type: 'auto_assignment'
        })
    }

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <FormProvider {...form}>
                <AddRule data={data} onSubmit={onSubmit} allAssignments={props.allAssignments} mutationLoading={mutationLoading} />
            </FormProvider>
        )
    }

    return <ErrorMessage />
}