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
    onSubmit: (formData: ICreateRoleFormFields) => void;
}

export const CreateRole = (props: CreateRoleProps) => {
    const { defaultValues, onSubmit } = props;
    const form = useForm<ICreateRoleFormFields>({
        defaultValues: defaultValues ?? {
            name: '',
            description: '',
            modules: {
                configurations: true,
                dashboards: true,
                tickets: true
            }
        }
    });

    return (
        <FormProvider {...form}>
            <FlexBox justifyContent="center" width="100%">
                <FlexBox gap={'20px'} flexDirection="column" padding="20px" width="70%">
                    <TextboxFieldWithLabel name="name" label="Role Name" size="small" rules={{ required: 'Name is required' }} />
                    <TextboxFieldWithLabel name="description" label="Description" size="small" />
                    <Permissions onSubmit={onSubmit} />
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}