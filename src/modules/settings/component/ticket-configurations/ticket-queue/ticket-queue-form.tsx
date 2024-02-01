import React, { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Grid, Button } from "@mui/material";
import { TextboxField, AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Employee } from "modules/settings/apis";

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;

interface IEmployeeList {
    key: string;
    value: string;
}

export interface IQueueFormFields {
    queueName: string;
    queueKey: string;
    assignedEmployees: IEmployeeList[];
    backUpEmployee: IEmployeeList[];
    autoAssignType: string;
    queueType: string;
    timeout: number;
    backupEmployeeType: string;
    maxAssignments: number;
}

const selectBackupEmployeeList = [
    {
        value: 'John', key: '453453'
    },
    {
        value: 'Leo', key: '53454'
    },
    {
        value: 'Charles', key: '634603'
    }
] as IEmployeeList[]

interface ITicketQueueFormProps {
    autoAssignTypes: string[];
    employees: Employee[];
    queueTypes: string[];
    defaultValues?: IQueueFormFields;
    mode: 'create' | 'edit'
    onFormSubmitHandler: (data: IQueueFormFields) => void;
}

export const TicketQueueForm = (props: ITicketQueueFormProps) => {
    const { mode, defaultValues, autoAssignTypes, employees, queueTypes, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<IQueueFormFields>({
        defaultValues: defaultValues ?? {
            queueKey: '',
            queueName: '',
            assignedEmployees: [],
            backUpEmployee: [],
            autoAssignType: autoAssignTypes[0],
            queueType: queueTypes[0]
        }
    });

    const onSubmit = React.useCallback(async (formvalues: IQueueFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler])

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" flexDirection="column">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="queueName" label="Queue Name" fullWidth rules={{ required: 'Queue name is required' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="queueKey" disabled={isInEditMode} label="Queue Key" fullWidth rules={{ required: 'Queue key is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteField label="Select Employee" name="assignedEmployees"
                            options={employees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item.lastName ?? ''}` }))}
                            placeholder="Select Employee" />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteField label="Select Backup Employee" name="backUpEmployee"
                            options={selectBackupEmployeeList}
                            placeholder="Select Backup Employee" />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField name="autoAssignType" label="Auto Assign Type" menuOptions={autoAssignTypes.map((item) => ({ key: item, value: item }))} sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField name="queueType" label="Type" menuOptions={queueTypes.map((item) => ({ key: item, value: item }))} sx={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="timeout" label="Timeout" fullWidth type="number" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="maxAssignments" label="Max Assignments" fullWidth type="number" />
                    </Grid>
                </Grid>
                <StlyedFlexBox gap='10px' width="100%" justifyContent="flex-end">
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Queue' : 'Add Queue'}</Button>
                </StlyedFlexBox>
            </FlexBox>
        </FormProvider>
    )
}