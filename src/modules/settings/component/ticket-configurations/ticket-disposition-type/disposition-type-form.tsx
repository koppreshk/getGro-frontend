import { Button, Grid } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form"

export interface IDispositionTypeFormFields {
    dispositionTypeName: string;
    subStatus: string;
}

interface IDispositionTypeFormProps {
    mode: 'create' | 'edit';
    defaultValues?: IDispositionTypeFormFields;
    onFormSubmitHandler: (data: IDispositionTypeFormFields) => void;
}

export const TispositionTypeForm = (props: IDispositionTypeFormProps) => {
    const { mode, defaultValues, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<IDispositionTypeFormFields>({
        defaultValues: defaultValues ?? {
            dispositionTypeName: '',
            subStatus: ''
        }
    });

    const onSubmit = useCallback(async (formvalues: IDispositionTypeFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler])

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextboxField name="dispositionTypeName" label="Name" fullWidth rules={{ required: 'Disposition type name is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextboxField name="subStatus" label="Sub Status" fullWidth />
                    </Grid>
                </Grid>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => methods.reset()}>{'Reset'}</Button> : null}
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Disposition Type' : 'Add Disposition Type'}</Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}