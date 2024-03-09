import { Grid } from "@mui/material";
import { TextboxField, SelectField, AutocompleteField } from "lib/form-fields";
import { capitalizeFirstLetter } from "lib/utils";
import { TicketEscalationFormProps } from "./ticket-escalation-form";
import { useFormContext } from "react-hook-form";

export const EscalationConditionForm = (props: Pick<TicketEscalationFormProps, 'after' | 'conditions' | 'queues' | 'statuses' | 'sub_statuses' | 'channels'>) => {
    const { after, conditions, queues, statuses, sub_statuses: subStatuses, channels } = props;
    const { watch } = useFormContext();

    const selectedChannelData = watch('channel') !== undefined ? channels.find((item) => item.channel_id.toString() === `2`)!.tags : undefined;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextboxField name="name" label="Name" placeholder="Escalation name" rules={{ required: 'Name is required' }} fullWidth />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="after" label="After" menuOptions={after.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>

                <Grid item xs={12} container spacing={2} justifyContent="center">
                    <Grid item xs={6}>
                        <SelectField sx={{ width: '100%' }} name="conditions" label="Conditions" menuOptions={conditions.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} variant="standard" />
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <TextboxField name="alert" label="Alert(in min)" type="number" fullWidth />
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
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="channel" label="Select Channel" menuOptions={channels.map((item) => ({ key: item?.channel_id.toString(), value: item?.name }))} />
                </Grid>
                <Grid item xs={6}>
                    <AutocompleteField name="tag" label="Select Tags" options={selectedChannelData?.map((item) => ({ key: item?.tag_id?.toString(), value: item?.tag }))} placeholder="Select Tags" />
                </Grid>
            </Grid>
        </>
    )
}