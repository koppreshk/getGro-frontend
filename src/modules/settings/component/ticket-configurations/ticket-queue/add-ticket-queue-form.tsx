import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Grid, Button } from "@mui/material";
import { TextboxField, AutocompleteField, SelectField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { ICreateTicketQueueArgs } from "modules/settings/apis";

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
    type: string;
    timeout: number;
    backupEmployeeType: string;
    maxAssignments: number;
}

const selectEmployeeList = [
    {
        value: 'Sanjay', key: '123'
    },
    {
        value: 'Sidd', key: '1243'
    },
    {
        value: 'Mouin', key: '1203'
    },
    {
        value: 'Kops', key: '1823'
    },
    {
        value: 'Anup', key: '1273'
    },
    {
        value: 'Shubham', key: '1223'
    }
] as IEmployeeList[];

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

const selectAutoAssignTypeOptions = [
    { value: "Round Robin ", key: 'round_robin' },
    { value: "Round Robin when available ", key: "round_robin_when_available" },
    { value: "One at a time", key: "one_at_a_time" }
]

const selectTypeOptions = [
    { value: "Last Action", key: 'last_action' },
    { value: "General", key: "general" },
    { value: "Call Back", key: "call_back" }
]

interface IAddTicketQueueFormProps {
    submitCreateTicketQueue: (data: ICreateTicketQueueArgs) => void;
}

export const AddTicketQueueForm = (props: IAddTicketQueueFormProps) => {

    const { submitCreateTicketQueue } = props;

    const methods = useForm<IAddNewQueueFormFields>({
        defaultValues: {
            queueKey: '',
            queueName: '',
            employee: [],
            backUpEmployee: [],
        }
    });

    console.log(methods?.watch())

    const onSubmit = React.useCallback(async (getformvalues: IAddNewQueueFormFields) => {
        submitCreateTicketQueue({
            queueName: getformvalues.queueName,
            queueKey: getformvalues.queueKey,
            autoAssignType: getformvalues.autoAssignType,
            type: getformvalues.type,
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
                        <TextboxField name="queueName" label="Queue Name" fullWidth rules={{ required: 'Queue name is required' }}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="queueKey" label="Queue Key" fullWidth rules={{ required: 'Queue key is required' }}/>
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteField label="Select Employee" name="employee"
                            options={selectEmployeeList}
                            placeholder="Select Employee" />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteField label="Select Backup Employee" name="backUpEmployee"
                            options={selectBackupEmployeeList}
                            placeholder="Select Backup Employee" />
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField name="autoAssignType" label="Auto Assign Type" menuOptions={selectAutoAssignTypeOptions} sx={{ width: '100%' }} defaultValue={selectAutoAssignTypeOptions[1].key}/>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField name="type" label="Type" menuOptions={selectTypeOptions} sx={{ width: '100%' }} defaultValue={selectTypeOptions[0].key}/>
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