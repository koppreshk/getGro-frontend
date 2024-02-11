import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { capitalizeFirstLetter } from "lib/utils";
import { SelectField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import { IEscalationMetadata } from "modules/settings/apis/escalations";

interface TicketEscalationFormProps extends Pick<IEscalationMetadata, 'after' | 'conditions' | 'queues' | 'statuses'> {
    subStatuses: string[];
    onFormSubmitHandler: (formData: ITicketEscalationFormFields) => void;
    defaultValues?: ITicketEscalationFormFields;
    mode: 'create' | 'edit'
}

export interface ITicketEscalationFormFields {
    name: string;
    after: string;
    conditions: string;
    alert: number;
    queues: string;
    statuses: string;
    subStatuses: string;
}

export const TicketEscalationForm = (props: TicketEscalationFormProps) => {
    const { onFormSubmitHandler, mode, defaultValues, ...rest } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const form = useForm<ITicketEscalationFormFields>({
        defaultValues: defaultValues ?? {
            after: '',
            alert: 2,
            conditions: '',
            name: '',
            queues: '',
            statuses: '',
            subStatuses: ''
        }
    });

    const { after, conditions, queues, statuses, subStatuses } = rest;

    const onSubmit = React.useCallback(async (formvalues: ITicketEscalationFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler])

    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" gap="10px" height="calc(100% - 77px)" justifyContent="space-between" flexDirection="column">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="name" label="Name" />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField sx={{ width: '100%' }} name="after" label="After" menuOptions={after.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField sx={{ width: '100%' }} name="conditions" label="Conditions" menuOptions={conditions.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="alert" label="Alert(in min)" type="number" />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField sx={{ width: '100%' }} name="queues" label="Queues" menuOptions={queues.map((item) => ({ key: item.uniqueKey, value: capitalizeFirstLetter(item.name, '_') }))} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField sx={{ width: '100%' }} name="statuses" label="Statuses" menuOptions={statuses.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField sx={{ width: '100%' }} name="subStatuses" label="Sub Statuses" menuOptions={subStatuses.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                    </Grid>
                </Grid>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => form.reset()}>{'Reset'}</Button> : null}
                    <Button variant="contained" size="large" type="submit" onClick={form.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Escalaltion' : 'Add Escalaltion'}</Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}