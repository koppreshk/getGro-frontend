import { FormProvider, useForm } from "react-hook-form"
import { Button, Grid } from "@mui/material";
import { SelectField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux"
import { IEscalationMetadata } from "modules/settings/apis/escalations";
import { capitalizeFirstLetter } from "lib/utils";

export interface ITicketEscalationFormFields {
    name: string;
    after: string;
    conditions: string;
    alert: number;
    queues: string;
    statuses: string;
    subStatuses: string;
}

interface ICreateEscalationProps extends Omit<IEscalationMetadata, 'sub_statuses'> {
    subStatuses: string[];
    onAddEscalation: (formData: ITicketEscalationFormFields) => void;
}

export const CreateTicketEscalation = (props: ICreateEscalationProps) => {
    const form = useForm<ITicketEscalationFormFields>();
    const { onAddEscalation, ...rest } = props;

    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" gap="10px" height="calc(100% - 77px)" justifyContent="space-between" flexDirection="column">
                <CreateEscalationForm {...rest} />
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    <Button variant="contained" size="large" type="submit" onClick={form.handleSubmit(onAddEscalation)}>{'Add Escalaltion'}</Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}

const CreateEscalationForm = (props: Pick<ICreateEscalationProps, 'after' | 'conditions' | 'queues' | 'statuses' | 'subStatuses'>) => {
    const { after, conditions, queues, statuses, subStatuses } = props;
    return (
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
    )
}