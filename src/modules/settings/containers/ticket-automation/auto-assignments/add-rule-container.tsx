import { AddRule } from "modules/settings/component/ticket-automation"
import { FormProvider, useForm } from "react-hook-form"

export interface IAddRuleFormFields {
    ruleName: string;
    description: string;
    allTicketConditions: {
        condition: string;
        conditionValue: string;
        ticketFields: string;
    }[];
    anyTicketConditions: {
        condition: string;
        conditionValue: string;
        ticketFields: string;
    }[]
    assignmentMode: string;
    selectedQueue: string;
}

export const AddRuleContainer = () => {
    const form = useForm<IAddRuleFormFields>({
        defaultValues: {
            allTicketConditions: [{
                ticketFields: '',
                condition: 'is',
                conditionValue: ''
            }],
            description: '',
            ruleName: '',
            anyTicketConditions: [],
            assignmentMode: 'round-robin-ed',
            selectedQueue: ''
        }
    });

    return (
        <FormProvider {...form}>
            <AddRule />
        </FormProvider>
    )
}