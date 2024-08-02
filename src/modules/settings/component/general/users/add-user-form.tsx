import { Button, Grid } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form"

export interface IUserFormFields {
    firstName: string;
    lastName: string;
    role: string;
    userId?: number;
}

interface IUserFormProps {
    mode: 'create' | 'edit';
    defaultValues?: IUserFormFields;
    onFormSubmitHandler: (data: IUserFormFields) => void;
}

export const AddUserForm = (props: IUserFormProps) => {
    const { mode, defaultValues, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<IUserFormFields>({
        defaultValues: defaultValues ?? {
            firstName: '',
            lastName: '',
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
                    <Grid item xs={6}>
                        <TextboxField name="firstName" label="First Name" fullWidth rules={{ required: 'First name is required' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="lastName" label="Last Name" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField sx={{ width: '100%' }} name="role" label="Role" menuOptions={[{ key: 'admin', value: 'Admin' }, { key: 'agent', value: 'Agent' }]} fullWidth rules={{ required: 'Selection is required' }} />
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
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Agent' : 'Add Agent'}</Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}