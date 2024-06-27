import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form"
import { FlexBox } from "lib/ui-ux";
import { Button, Grid } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { ITicketStatusFormFields } from "modules/settings/containers/ticket-status";

interface ITicketStatusFormProps {
    mode: 'create' | 'edit';
    defaultValues?: ITicketStatusFormFields;
    onFormSubmitHandler: (data: ITicketStatusFormFields) => void;
}

export const TicketStatusForm = (props: ITicketStatusFormProps) => {
    const { mode, defaultValues, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<ITicketStatusFormFields>({
        defaultValues: defaultValues ?? {
            ticketStatusName: ''
        }
    });

    const onSubmit = useCallback(async (formvalues: ITicketStatusFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler]);

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextboxField name="ticketStatusName" label="Name" fullWidth rules={{ required: 'Ticket status is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        {isInEditMode ?
                            <TextboxField name="ticketStatusId" label="Id" fullWidth disabled />
                            :
                            <></>}
                    </Grid>
                </Grid>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => methods.reset()}>{'Reset'}</Button> : null}
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Ticket Status' : 'Add Ticket Status'}</Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}