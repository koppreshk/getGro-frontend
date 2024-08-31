import { Grid, Typography } from "@mui/material"
import styled from "styled-components";
import { AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { IEscalationType, IQueue, IUser } from "modules/settings/apis/ticket-automation/escalations/fetch-sla-metadata";

const Wrapper = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

const HeaderLabel = styled(FlexBox)`
    margin-bottom: 12px;
`;

interface IAddEscalationProps {
    escalationTimes: IEscalationType[];
    queueList: IQueue[];
    userList: IUser[];
}

export const AddEscalation = (props: IAddEscalationProps) => {
    const { escalationTimes, queueList, userList } = props;

    return (
        <FlexBox flexDirection="column" gap="15px">
            <Typography variant="h5"> Send escalation when the SLA is violated</Typography>
            <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                <Typography variant="h5">First response escalation</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <HeaderLabel >
                            <Typography variant="body2"> When First response target is not met, escalate </Typography>
                        </HeaderLabel>
                        <SelectField name="addEscalation.ftrDuration" menuOptions={escalationTimes.map((data) =>({key: data.id.toString(), value: data.name}))} sx={{ width: '100%' }} label="Escalate" />
                    </Grid>
                    <Grid item xs={8}>
                        <HeaderLabel>
                            <Typography variant="body2"> To </Typography>
                        </HeaderLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AutocompleteField label="Group" name="addEscalation.ftrGroup"
                                    options={queueList.map((data) =>({key: data.id.toString(), value: data.name}))}
                                    placeholder="Group" />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteField label="Agent" name="addEscalation.ftrAgent"
                                    options={userList.map((data) =>({key: data.id.toString(), value: `${data.firstName} ${data.lastName ?? ''}`}))}
                                    placeholder="Agent" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Wrapper>

            <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                <Typography variant="h5">Next response escalation</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <HeaderLabel >
                            <Typography variant="body2"> When Next response target is not met, escalate </Typography>
                        </HeaderLabel>
                        <SelectField name="addEscalation.ntrDuration" menuOptions={escalationTimes.map((data) =>({key: data.id.toString(), value: data.name}))} sx={{ width: '100%' }} label="Escalate" />
                    </Grid>
                    <Grid item xs={8}>
                        <HeaderLabel>
                            <Typography variant="body2"> To </Typography>
                        </HeaderLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AutocompleteField label="Group" name="addEscalation.ntrGroup"
                                    options={queueList.map((data) =>({key: data.id.toString(), value: data.name}))}
                                    placeholder="Group" />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteField label="Agent" name="addEscalation.ntrAgent"
                                    options={userList.map((data) =>({key: data.id.toString(), value: `${data.firstName} ${data.lastName ?? ''}`}))}
                                    placeholder="Agent" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Wrapper>

            <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                <Typography variant="h5">Resolution escalation</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <HeaderLabel >
                            <Typography variant="body2"> When Resolution target is not met, escalate </Typography>
                        </HeaderLabel>
                        <SelectField name="addEscalation.resolutionDuration" menuOptions={escalationTimes.map((data) =>({key: data.id.toString(), value: data.name}))} sx={{ width: '100%' }} label="Escalate" />
                    </Grid>
                    <Grid item xs={8}>
                        <HeaderLabel>
                            <Typography variant="body2"> To </Typography>
                        </HeaderLabel>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <AutocompleteField label="Group" name="addEscalation.resolutionGroup"
                                    options={queueList.map((data) =>({key: data.id.toString(), value: data.name}))}
                                    placeholder="Group" />
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteField label="Agent" name="addEscalation.resolutionAgent"
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