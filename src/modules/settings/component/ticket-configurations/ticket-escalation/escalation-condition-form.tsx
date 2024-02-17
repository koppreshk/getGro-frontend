import { Grid } from "@mui/material";
import { TextboxField, SelectField } from "lib/form-fields";
import { capitalizeFirstLetter } from "lib/utils";
import { TicketEscalationFormProps } from "./ticket-escalation-form";

export const EscalationConditionForm = (props: Pick<TicketEscalationFormProps, 'after' | 'conditions' | 'queues' | 'statuses' | 'sub_statuses'>) => {
    const { after, conditions, queues, statuses, sub_statuses: subStatuses } = props;
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
                    <SelectField sx={{ width: '100%' }} name="queues" label="Queues" menuOptions={queues.map((item) => ({ key: item.id.toString(), value: capitalizeFirstLetter(item.name, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="statuses" label="Statuses" menuOptions={statuses.map((item) => ({ key: item.id.toString(), value: capitalizeFirstLetter(item.name, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="subStatuses" label="Sub Statuses" menuOptions={subStatuses.map((item) => ({ key: item.id.toString(), value: capitalizeFirstLetter(item.name, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="customerClassification" label="Customer Classification" menuOptions={[].map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="designationType" label="Designation Type" menuOptions={[].map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="lastConversationType" label="Last Conversation Type" menuOptions={[].map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="typeOfTicket" label="Type Of Ticket" menuOptions={[].map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
            </Grid>
        </>
    )
}