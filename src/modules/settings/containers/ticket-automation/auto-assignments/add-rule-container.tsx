import { AddRule } from "modules/settings/component/ticket-automation"
import { FormProvider, useForm } from "react-hook-form"

export const AddRuleContainer = () => {
    const form = useForm();

    return (
        <FormProvider {...form}>
            <AddRule />
        </FormProvider>
    )
}