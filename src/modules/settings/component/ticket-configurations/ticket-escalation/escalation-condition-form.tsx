import { Grid } from "@mui/material";
import { TextboxField, SelectField } from "lib/form-fields";
import { capitalizeFirstLetter } from "lib/utils";
import { TicketEscalationFormProps } from "./ticket-escalation-form";

export const EscalationConditionForm = (props: Pick<TicketEscalationFormProps, 'after' | 'conditions' | 'queues' | 'statuses' | 'subStatuses'>) => {
    const { after, conditions, queues, statuses, subStatuses } = props;
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextboxField name="name" label="Name" placeholder="Escalation name" rules={{ required: 'Name is required' }} />
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
        </>
    )
}