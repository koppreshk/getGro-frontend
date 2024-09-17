import { TextboxFieldWithLabel } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form"
import { Permissions } from './permissions';
import { AllPermissionKeys, ModuleKeys } from "lib/enums";

export interface ICreateRoleFormFields {
    name: string;
    description: string;
    modules: {
        [key in ModuleKeys]: boolean
    }
    permissions: {
        [key in AllPermissionKeys]: boolean;
    }
}

interface CreateRoleProps {
    defaultValues?: ICreateRoleFormFields;
}

export const CreateRole = (props: CreateRoleProps) => {
    const { defaultValues } = props;
    const form = useForm<ICreateRoleFormFields>({
        defaultValues: defaultValues ?? {
            name: '',
            description: '',
            modules: {
                CONFIGURATIONS: true,
                DASHBOARDS: true,
                TICKETS: true
            }
        }
    });

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