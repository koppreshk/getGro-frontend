import { TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import { Permissions } from './permissions';

export const CreateRole = () => {
    const form = useForm();

    return (
        <FormProvider {...form}>
            <FlexBox gap={'20px'} flexDirection="column" padding="20px" width="100%">
                <TextboxFieldWithLabel name="name" label="Role Name" sx={{ maxWidth: '60%' }} rules={{ required: 'Name is required' }} />
                <TextboxFieldWithLabel name="description" label="Description" sx={{ maxWidth: '60%' }} />
                <Permissions />
            </FlexBox>
        </FormProvider>
    )
}