import React, { memo, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import styled from "styled-components";
import { Grid, Button } from "@mui/material";
import { TextboxField, AutocompleteField } from "lib/form-fields";
import { CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { Employee } from "modules/settings/apis/queues";

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;

interface IEmployeeList {
    key: string;
    value: string;
}
export interface IQueueFormFields {
    queueName: string;
    assignedEmployees: IEmployeeList[];
}

interface ITicketQueueFormProps {
    employees: Employee[];
    defaultValues?: IQueueFormFields;
    mode: 'create' | 'edit';
    mutationLoading: boolean;
    toggleAddQueueDrawer: () => void;
    onFormSubmitHandler: (data: IQueueFormFields) => void;
}

export const TicketQueueForm = memo((props: ITicketQueueFormProps) => {
    const { mode, defaultValues, employees, mutationLoading, toggleAddQueueDrawer, onFormSubmitHandler } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);

    const methods = useForm<IQueueFormFields>({
        defaultValues: defaultValues ?? {
            queueName: '',
            assignedEmployees: [],
        }
    });

    const onSubmit = React.useCallback(async (formvalues: IQueueFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler])

    return (
        <FormProvider {...methods}>
            <FlexBox padding="20px" width="100%" height="calc(100% - 77px)" flexDirection="column" justifyContent="space-between">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="queueName" label="Queue Name" fullWidth rules={{ required: 'Queue name is required' }} />
                    </Grid>
                    <Grid item xs={12}>
                        <AutocompleteField label="Select Employee" name="assignedEmployees"
                            options={employees.map((item) => ({ key: item.id.toString(), value: `${item.firstName} ${item.lastName ?? ''}` }))}
                            placeholder="Select Employee" />
                    </Grid>
                </Grid>
                <StlyedFlexBox gap='10px' width="100%" justifyContent="flex-end">
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => methods.reset()}>{'Reset'}</Button> : null}
                    <CancelButton onClick={toggleAddQueueDrawer} />
                    <LoadingButton isLoading={mutationLoading} variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onSubmit)}>{isInEditMode ? 'Edit Queue' : 'Add Queue'}</LoadingButton>
                </StlyedFlexBox>
            </FlexBox>
        </FormProvider>
    )
})