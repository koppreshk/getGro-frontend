import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Grid, Button } from "@mui/material";
import { TextboxField, AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Employee, ICreateTicketQueueArgs } from "modules/settings/apis";

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;

interface IEmployeeList {
    key: string;
    value: string;
}

interface IAddNewQueueFormFields {
    queueName: string;
    queueKey: string;
    employee: IEmployeeList[];
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

interface IAddTicketQueueFormProps {
    autoAssignTypes: string[];
    employees: Employee[];
    queueTypes: string[];
    submitCreateTicketQueue: (data: ICreateTicketQueueArgs) => void;
}

export const AddTicketQueueForm = (props: IAddTicketQueueFormProps) => {

    const { submitCreateTicketQueue, autoAssignTypes, employees, queueTypes } = props;

    const methods = useForm<IAddNewQueueFormFields>({
        defaultValues: {
            queueKey: '',
            queueName: '',
            employee: [],
            backUpEmployee: [],
            autoAssignType: autoAssignTypes[0],
            queueType: queueTypes[0]
        }
    });

    const onSubmit = React.useCallback(async (getformvalues: IAddNewQueueFormFields) => {
        submitCreateTicketQueue({
            queueName: getformvalues.queueName,
            queueKey: getformvalues.queueKey,
            autoAssignType: getformvalues.autoAssignType,
            queueType: getformvalues.queueType,
            assigned_employees: [
                {
                    "firstName": "Moiun",
                    "lastName": "Pasha",
                    "id": 12
                },
                {
                    "firstName": "Sangay",
                    "lastName": "Jee",
                    "id": 11
                }
            ]
        });
    }, [submitCreateTicketQueue])

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" flexDirection="column">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="queueName" label="Queue Name" fullWidth rules={{ required: 'Queue name is required' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="queueKey" label="Queue Key" fullWidth rules={{ required: 'Queue key is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteField label="Select Employee" name="employee"
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
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>Add Queue</Button>
                </StlyedFlexBox>
            </FlexBox>
        </FormProvider>
    )
}