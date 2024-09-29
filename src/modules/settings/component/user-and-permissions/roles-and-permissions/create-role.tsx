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

export type RoleModes = 'view' | 'edit' | 'add' | 'userProfile';

interface CreateRoleProps {
    mode?: RoleModes;
    defaultValues?: ICreateRoleFormFields;
    mutationLoading?: boolean;
    onSubmit?: (formData: ICreateRoleFormFields) => void;
}

export const CreateRole = (props: CreateRoleProps) => {
    const { defaultValues, mode, onSubmit } = props;
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
            <FlexBox width="100%">
                <FlexBox gap={'20px'} flexDirection="column" padding="20px" width="100%">
                    <TextboxFieldWithLabel name="name" disabled={mode === 'userProfile'} sx={{ width: '70%' }} label="Role Name" size="small" rules={{ required: 'Name is required' }} />
                    {mode !== 'userProfile' ? <TextboxFieldWithLabel name="description" label="Description" sx={{ width: '70%' }} size="small" /> : null}
                    <Permissions onSubmit={onSubmit} mutationLoading={props.mutationLoading} mode={mode} />
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}