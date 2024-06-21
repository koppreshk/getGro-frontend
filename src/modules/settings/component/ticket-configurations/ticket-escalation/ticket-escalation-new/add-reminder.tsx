import { Grid, Typography } from "@mui/material"
import { AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { Queue, ReminderTime, User } from "modules/settings/apis/escalations/fetch-sla-metadata";
import styled from "styled-components";

const Wrapper = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

const HeaderLabel = styled(FlexBox)`
    margin-bottom: 12px;
`;

interface IAddReminderProps {
    reminderTimes: ReminderTime[];
    queueList: Queue[];
    userList: User[];
}

export const AddReminder = (props: IAddReminderProps) => {
    const { queueList, reminderTimes, userList } = props;

    return (
        <FlexBox flexDirection="column" gap="15px">
            <Typography variant="h5"> Remind agents when the SLA due time approaches</Typography>
            <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                <Typography variant="h5">First response reminder</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <HeaderLabel >
                            <Typography variant="body2"> When First response target approches in </Typography>
                        </HeaderLabel>
                        <SelectField name="addReminders.ftrDuration" menuOptions={reminderTimes.map((data) =>({key: data.id.toString(), value: data.name}))} sx={{ width: '100%' }} label="Duration" />
                    </Grid>
                    <Grid item xs={8}>
                        <HeaderLabel>
                            <Typography variant="body2"> Send reminder to </Typography>
                        </HeaderLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AutocompleteField label="Group" name="addReminders.ftrGroup"
                                    options={queueList.map((data) =>({key: data.id.toString(), value: data.name}))}
                                    placeholder="Group" />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteField label="Agent" name="addReminders.ftrAgent"
                                    options={userList.map((data) =>({key: data.id.toString(), value: `${data.firstName} ${data.lastName ?? ''}`}))}
                                    placeholder="Agent" />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Wrapper>

            <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                <Typography variant="h5">Next response reminder</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <HeaderLabel >
                            <Typography variant="body2"> When Next response target approches in </Typography>
                        </HeaderLabel>
                        <SelectField name="addReminders.ntrDuration" menuOptions={reminderTimes.map((data) =>({key: data.id.toString(), value: data.name}))} sx={{ width: '100%' }} label="Duration" />
                    </Grid>
                    <Grid item xs={8}>
                        <HeaderLabel>
                            <Typography variant="body2"> Send reminder to </Typography>
                        </HeaderLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AutocompleteField label="Group" name="addReminders.ntrGroup"
                                    options={queueList.map((data) =>({key: data.id.toString(), value: data.name}))}
                                    placeholder="Group" />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteField label="Agent" name="addReminders.ntrAgent"
                                    options={userList.map((data) =>({key: data.id.toString(), value: `${data.firstName} ${data.lastName ?? ''}`}))}
                                    placeholder="Agent" />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Wrapper>

            <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                <Typography variant="h5">Resolution reminder</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <HeaderLabel >
                            <Typography variant="body2"> When Resolution target approches in </Typography>
                        </HeaderLabel>
                        <SelectField name="addReminders.resolutionDuration" menuOptions={reminderTimes.map((data) =>({key: data.id.toString(), value: data.name}))} sx={{ width: '100%' }} label="Duration" />
                    </Grid>
                    <Grid item xs={8}>
                        <HeaderLabel>
                            <Typography variant="body2"> Send reminder to </Typography>
                        </HeaderLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AutocompleteField label="Group" name="addReminders.resolutionGroup"
                                    options={queueList.map((data) =>({key: data.id.toString(), value: data.name}))}
                                    placeholder="Group" />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteField label="Agent" name="addReminders.resolutionAgent"
                                    options={userList.map((data) =>({key: data.id.toString(), value: `${data.firstName} ${data.lastName ?? ''}`}))}
                                    placeholder="Agent" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Wrapper>
        </FlexBox>
    )
}