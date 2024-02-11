import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { capitalizeFirstLetter } from "lib/utils";
import { SelectField, TextboxField } from "lib/form-fields"
import { FlexBox } from "lib/ui-ux";
import { IEscalationMetadata } from "modules/settings/apis/escalations";

interface TicketEscalationFormProps extends Pick<IEscalationMetadata, 'after' | 'conditions' | 'queues' | 'statuses'> {
    subStatuses: string[];
    onFormSubmitHandler: (formData: ITicketEscalationFormFields) => void;
    defaultValues?: ITicketEscalationFormFields;
    mode: 'create' | 'edit'
}

export interface ITicketEscalationFormFields {
    name: string;
    after: string;
    conditions: string;
    alert: number;
    queues: string;
    statuses: string;
    subStatuses: string;
}

const steps = [
    'Select Conditions for Escalation',
    'Set Actions for Escalation'
];

export const TicketEscalationForm = (props: TicketEscalationFormProps) => {
    const { onFormSubmitHandler, mode, defaultValues, ...rest } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);
    const [activeStep, setActiveStep] = React.useState(0);

    const form = useForm<ITicketEscalationFormFields>({
        defaultValues: defaultValues ?? {
            after: '',
            alert: 2,
            conditions: '',
            name: '',
            queues: '',
            statuses: '',
            subStatuses: ''
        }
    });

    const onSubmit = React.useCallback(async (formvalues: ITicketEscalationFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" gap="10px" height="calc(100% - 77px)" flexDirection="column">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === 0 ? <EscalationConditionForm {...rest} /> : <span>actions</span>}
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}>
                        Back
                    </Button>
                    {isInEditMode ? <Button variant="text" size="large" type="button" onClick={() => form.reset()}>{'Reset'}</Button> : null}
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        onClick={() => activeStep === steps.length - 1 ? form.handleSubmit(onSubmit) : handleNext()}>
                        {isInEditMode ? 'Edit Escalaltion' : activeStep === steps.length - 1 ? 'Add Escalation' : 'Next'}
                    </Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}

const EscalationConditionForm = (props: Pick<TicketEscalationFormProps, 'after' | 'conditions' | 'queues' | 'statuses' | 'subStatuses'>) => {
    const { after, conditions, queues, statuses, subStatuses } = props;
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextboxField name="name" label="Name" />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="after" label="After" menuOptions={after.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
                <Grid item xs={12}>
                    <SelectField sx={{ width: '100%' }} name="conditions" label="Conditions" menuOptions={conditions.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
                <Grid item xs={6}>
                    <TextboxField name="alert" label="Alert(in min)" type="number" />
                </Grid>
                <Grid item xs={6}>
                    <SelectField sx={{ width: '100%' }} name="queues" label="Queues" menuOptions={queues.map((item) => ({ key: item.uniqueKey, value: capitalizeFirstLetter(item.name, '_') }))} />
                </Grid>
                <Grid item xs={12}>
                    <SelectField sx={{ width: '100%' }} name="statuses" label="Statuses" menuOptions={statuses.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
                <Grid item xs={12}>
                    <SelectField sx={{ width: '100%' }} name="subStatuses" label="Sub Statuses" menuOptions={subStatuses.map((item) => ({ key: item, value: capitalizeFirstLetter(item, '_') }))} />
                </Grid>
            </Grid>
        </>
    )
}