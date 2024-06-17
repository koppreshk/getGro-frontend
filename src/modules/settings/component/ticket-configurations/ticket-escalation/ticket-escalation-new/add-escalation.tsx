import { Grid, Typography } from "@mui/material"
import { AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux"
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";

interface ISLAaddEscalationFormFields {
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
    { key: 'immediately', value: 'Immediately' },
    { key: '15min', value: 'After 15 minutes' },
    { key: '30min', value: 'After 30 minutes' },
    { key: '1hr', value: 'After 1 hour' },
    { key: '2hr', value: 'After 2 hour' },
    { key: '4hr', value: 'After 4 hour' },
    { key: '8hr', value: 'After 8 hour' }
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

export const AddEscalation = () => {
    const methods = useForm<ISLAaddEscalationFormFields>();

    return (
        <FormProvider {...methods}>


            <FlexBox flexDirection="column" gap="15px">
                <Typography variant="h5"> Send escalation when the SLA is violated</Typography>
                <Wrapper flexDirection="column" padding="15px 20px" gap="20px">
                    <Typography variant="h5">First response reminder</Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <HeaderLabel >
                                <Typography variant="body2"> When First response target is not met, escalate </Typography>
                            </HeaderLabel>
                            <SelectField name="addEscalation.ftrDuration" menuOptions={menuOptions} sx={{ width: '100%' }} label="Escalate" />
                        </Grid>
                        <Grid item xs={8}>
                            <HeaderLabel>
                                <Typography variant="body2"> To </Typography>
                            </HeaderLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Group" name="addEscalation.ftrGroup"
                                        options={selectGroupList}
                                        placeholder="Group" />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Agent" name="addEscalation.ftrAgent"
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
                                <Typography variant="body2"> When Next response target is not met, escalate </Typography>
                            </HeaderLabel>
                            <SelectField name="addEscalation.ntrDuration" menuOptions={menuOptions} sx={{ width: '100%' }} label="Escalate" />
                        </Grid>
                        <Grid item xs={8}>
                            <HeaderLabel>
                                <Typography variant="body2"> To </Typography>
                            </HeaderLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Group" name="addEscalation.ntrGroup"
                                        options={selectGroupList}
                                        placeholder="Group" />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Agent" name="addEscalation.ntrAgent"
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
                                <Typography variant="body2"> When Resolution target is not met, escalate </Typography>
                            </HeaderLabel>
                            <SelectField name="addEscalation.resolutionDuration" menuOptions={menuOptions} sx={{ width: '100%' }} label="Escalate" />
                        </Grid>
                        <Grid item xs={8}>
                            <HeaderLabel>
                                <Typography variant="body2"> To </Typography>
                            </HeaderLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Group" name="addEscalation.resolutionGroup"
                                        options={selectGroupList}
                                        placeholder="Group" />
                                </Grid>
                                <Grid item xs={6}>
                                    <AutocompleteField label="Agent" name="addEscalation.resolutionAgent"
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