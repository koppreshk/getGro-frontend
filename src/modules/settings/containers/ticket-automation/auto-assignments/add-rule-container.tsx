import { CenteredCircularProgress, ErrorMessage } from "lib/ui-ux";
import { useFetchFieldsAndConditions } from "modules/settings/apis/ticket-automation";
import { AddRule } from "modules/settings/component/ticket-automation"
import { FormProvider, useForm } from "react-hook-form"

export interface IAddRuleFormFields {
    ruleName: string;
    description: string;
    allTicketConditions: {
        operator: string;
        conditionValue: string;
        ticketFields: string;
    }[];
    anyTicketConditions: {
        operator: string;
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
                operator: '',
                conditionValue: ''
            }],
            description: '',
            ruleName: '',
            anyTicketConditions: [],
            assignmentMode: 'round-robin-ed',
            selectedQueue: ''
        }
    });
    const { data, isLoading } = useFetchFieldsAndConditions();

    if (isLoading) {
        return <CenteredCircularProgress />
    }

    if (data) {
        return (
            <FormProvider {...form}>
                <AddRule data={data} />
            </FormProvider>
        )
    }

    return <ErrorMessage />
}