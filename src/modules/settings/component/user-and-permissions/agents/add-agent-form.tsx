import { FormProvider, useForm } from "react-hook-form"
import { Button, Grid } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { IRoles } from "modules/settings/apis/users-and-permissions";
import { useCallback, useMemo } from "react";

export interface IUserFormFields {
    name: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    role: string;
    userId?: number;
}

interface IUserFormProps {
    mode: 'create' | 'edit';
    roles: IRoles[];
    mutationLoading: boolean
    defaultValues?: IUserFormFields;
    toggleUserDrawer: () => void;
    onFormSubmitHandler: (data: IUserFormFields) => void;
}

export const AddAgentForm = (props: IUserFormProps) => {
    const { mode, defaultValues, roles, mutationLoading, toggleUserDrawer, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<IUserFormFields>({
        defaultValues: defaultValues ?? {
            name: '',
            displayName: '',
            role: 'agent'
        }
    });

    const onSubmit = useCallback(async (formvalues: IUserFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler]);

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextboxField name="name" label="Name" rules={{ required: 'First name is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxField name="displayName" label="Display Name" rules={{ required: 'Display name is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxField name="email" label="Email" rules={{ required: 'Email is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxField name="phoneNumber" label="Phone Number" />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField sx={{ width: '100%' }} name="role" label="Role" menuOptions={roles.map((item) => ({ key: item.id.toString(), value: item.name }))} fullWidth rules={{ required: 'Selection is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        {isInEditMode ?
                            <TextboxField name="userId" label="Id" fullWidth disabled />
                            :
                            <></>}
                    </Grid>
                </Grid>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => methods.reset()}>{'Reset'}</Button> : null}
                    <CancelButton onClick={toggleUserDrawer} />
                    <LoadingButton isLoading={mutationLoading} variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Agent' : 'Add Agent'}</LoadingButton>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}