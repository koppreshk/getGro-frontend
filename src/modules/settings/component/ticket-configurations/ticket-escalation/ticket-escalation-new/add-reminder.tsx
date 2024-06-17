import { Grid, Typography } from "@mui/material"
import { AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

interface ISLAreminderFormFields {
    ftrDuration: string;
    ftrGroup: string;
    ftrAgent: string;
    ntrDuration: string;
    ntrGroup: string;
    ntrAgent: string;
    resolutionDuration: string;
    resolutionGroup: string;
    resolutionAgent: string;
}


const menuOptions = [
    { key: '15min', value: '15 minutes' },
    { key: '30min', value: '30 minutes' },
    { key: '1hr', value: '1 hour' },
    { key: '2hr', value: '2 hour' },
    { key: '4hr', value: '4 hour' },
    { key: '8hr', value: '8 hour' }
];

interface IKeyValue {
    key: string;
    value: string;
}

const selectEmployeeList = [
    {
        value: 'John', key: '453453'
    },
    {
        value: 'Leo', key: '53454'
    },
    {
        value: 'Charles', key: '634603'
    }
] as IKeyValue[]

const selectGroupList = [
    {
        value: 'Email', key: '453453'
    },
    {
        value: 'Admin', key: '53454'
    },
    {
        value: 'Finance', key: '634603'
    }
] as IKeyValue[]

const Wrapper = styled(FlexBox)`
    border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
    border: ${({ theme }) => theme.semantics.standardBorder};
`;

const HeaderLabel = styled(FlexBox)`
    margin-bottom: 12px;
`;

export const AddReminder = () => {
    const methods = useForm<ISLAreminderFormFields>();

    return (
        <FormProvider {...methods}>


            <FlexBox flexDirection="column" gap="15px">
                <Typography variant="h5"> Remind agents when the SLA due time approaches</Typography>
                <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                    <Typography variant="h5">First response reminder</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <HeaderLabel >
                                <Typography variant="body2"> When First response target approches in </Typography>
                            </HeaderLabel>
                            <SelectField name="addreminders.ftrDuration" menuOptions={menuOptions} sx={{ width: '100%' }} label="Duration" />
                        </Grid>
                        <Grid item xs={8}>
                            <HeaderLabel>
                                <Typography variant="body2"> Send reminder to </Typography>
                            </HeaderLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Group" name="addreminders.ftrGroup"
                                        options={selectGroupList}
                                        placeholder="Group" />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Agent" name="addreminders.ftrAgent"
                                        options={selectEmployeeList}
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
                            <SelectField name="addreminders.ntrDuration" menuOptions={menuOptions} sx={{ width: '100%' }} label="Duration" />
                        </Grid>
                        <Grid item xs={8}>
                            <HeaderLabel>
                                <Typography variant="body2"> Send reminder to </Typography>
                            </HeaderLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Group" name="addreminders.ntrGroup"
                                        options={selectGroupList}
                                        placeholder="Group" />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Agent" name="addreminders.ntrAgent"
                                        options={selectEmployeeList}
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
                            <SelectField name="addreminders.resolutionDuration" menuOptions={menuOptions} sx={{ width: '100%' }} label="Duration" />
                        </Grid>
                        <Grid item xs={8}>
                            <HeaderLabel>
                                <Typography variant="body2"> Send reminder to </Typography>
                            </HeaderLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Group" name="addreminders.resolutionGroup"
                                        options={selectGroupList}
                                        placeholder="Group" />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Agent" name="addreminders.resolutionAgent"
                                        options={selectEmployeeList}
                                        placeholder="Agent" />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Wrapper>
            </FlexBox>
        </FormProvider>
    )
}