import React, { useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"
import styled from "styled-components"
import { Add, Close } from "@mui/icons-material"
import { Button, Drawer, Grid, IconButton, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"
import { AutocompleteField, SelectField, TextboxField } from "lib/form-fields"
import { TicketQueueList } from "./ticket-queue-list"

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;

export const TicketQueue = () => {

    const [openAddQueueDrawer, setOpenAddQueueDrawer] = React.useState(false);

    const toggleAddQueueDrawer = useCallback(() => {
        setOpenAddQueueDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column">
            <FlexBox width="100%" justifyContent="space-between" padding="10px">
                <Typography variant="h5">Ticket Queue</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={toggleAddQueueDrawer}>Add Queue</Button>
                <AddNewQueue openAddQueueDrawer={openAddQueueDrawer} toggleAddQueueDrawer={toggleAddQueueDrawer} />
            </FlexBox>
            <FlexBox width="100%" flexDirection="column">
                <TicketQueueList />
            </FlexBox>
        </FlexBox>
    )
}

interface IAddNewQueueProps {
    openAddQueueDrawer: boolean;
    toggleAddQueueDrawer: () => void
}

const HeaderWrapper = styled(FlexBox)`
    padding: 15px 10px;
    border-bottom: ${({ theme }) => theme.semantics.standardBorder};
`;

const AddNewQueue = (props: IAddNewQueueProps) => {
    const { openAddQueueDrawer, toggleAddQueueDrawer } = props;
    return (
        <>
            <Drawer anchor="right" open={openAddQueueDrawer} onClose={toggleAddQueueDrawer}>
                <FlexBox width="600px" height="100%" flexDirection="column">
                    <HeaderWrapper width="100%" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Add New Queue</Typography>
                        <IconButton aria-label="Close" onClick={toggleAddQueueDrawer}>
                            <Close />
                        </IconButton>
                    </HeaderWrapper>
                    <AddNewQueueForm />
                </FlexBox>
            </Drawer>
        </>
    )
}

interface IEmployeeList {
    key: string;
    value: string;
}

interface IAddNewQueueFormProps {
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
    { value: "Round Robin", key: 'Round Robin' },
    { value: "Round Robin when available", key: "Round Robin when available" },
    { value: "One at a time", key: "One at a time" }
]

const AddNewQueueForm = () => {

    const methods = useForm<IAddNewQueueFormProps>({
        defaultValues: {
            queueKey: '',
            queueName: '',
            employee: [],
            backUpEmployee: [],
        }
    });

    const onSubmit = React.useCallback(async () => {
        const getformvalues = methods.getValues();
        console.log("getformvalues", getformvalues);
    }, [methods])

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" flexDirection="column">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="queueName" label="Queue Name" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="queueKey" label="Queue Key" fullWidth />
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
                        <SelectField name="autoAssignType" label="Auto Assign Type" menuOptions={selectAutoAssignTypeOptions} sx={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField name="type" label="Type" menuOptions={selectAutoAssignTypeOptions} sx={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="timeout" label="Timeout" fullWidth type="number"/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="maxAssignments" label="Max Assignments" fullWidth type="number"/>
                    </Grid>
                </Grid>
                <StlyedFlexBox gap='10px' width="100%" justifyContent="flex-end">
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>Add Queue</Button>
                </StlyedFlexBox>
            </FlexBox>
        </FormProvider>
    )
}