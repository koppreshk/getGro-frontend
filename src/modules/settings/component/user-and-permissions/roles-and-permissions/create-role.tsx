import { TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import { Permissions } from './permissions';
import { AllPermissionKeys, ModuleKeys } from "./types";

interface ICreateRoleFormFields {
    name: string;
    description: string;
    modules: {
        [key in ModuleKeys]: boolean
    }
    permissions: {
        [key in AllPermissionKeys]: boolean;
    }
}

export const CreateRole = () => {
    const form = useForm<ICreateRoleFormFields>();

    return (
        <FormProvider {...form}>
            <FlexBox gap={'20px'} flexDirection="column" padding="20px" width="100%">
                <TextboxFieldWithLabel name="name" label="Role Name" size="small" sx={{ maxWidth: '60%' }} rules={{ required: 'Name is required' }} />
                <TextboxFieldWithLabel name="description" label="Description" size="small" sx={{ maxWidth: '60%' }} />
                <Permissions />
            </FlexBox>
        </FormProvider>
    )
}