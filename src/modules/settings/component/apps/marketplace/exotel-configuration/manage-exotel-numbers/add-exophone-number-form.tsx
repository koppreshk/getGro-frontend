import React from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Grid, Button, CircularProgress, DialogActions, Divider } from "@mui/material";
import { AutocompleteField, SelectField, TextboxField } from "lib/form-fields";
import { BackButton, CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { IAddExophoneNumberFormFields } from "modules/settings/containers/marketplace/exotel";
import { useForm, FormProvider } from "react-hook-form";

const steps = [
    {
        label: 'Add Exophone Number',
        description: '',
    },
    {
        label: 'Webhook',
        description: '',
    }
];

const ConfigSteps = (props: { activeStep: number }) => {
    const { activeStep } = props;

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography variant="body3">{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

function AddExophoneNumberForm(props: Pick<IAddExophoneNumberFormProps, 'exophoneNumMenuOption' | 'usersMenuOption'>) {
    const { exophoneNumMenuOption, usersMenuOption } = props;

    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxField name="appName" label="Group Name" size="small" type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <SelectField name="phoneNumber" label="Select Exotel Number" size="small" sx={{ width: '100%' }} menuOptions={exophoneNumMenuOption} rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <AutocompleteField label="Select  Users in Group" name="users" options={usersMenuOption} placeholder="Select Employee" size="small" />
            </Grid>
        </Grid>
    )
}


const AccountWebhookDetails = (props: { isMutationLoading: boolean | undefined }) => {
    return (
        <>
            {props.isMutationLoading ? <CenteredCircularProgress /> :
                <FlexBox flexDirection="column" gap="20px" width="75%">
                    <Typography variant="h5">Webhook</Typography>
                    <TextboxField name="webhookURL" size="small" type="text" label="Webhook URL" fullWidth />
                </FlexBox>
            }
        </>
    )
}

interface IKeyValue {
    key: string;
    value: string;
}

export interface IAddExophoneNumberFormProps {
    togglePopup: () => void;
    onSubmit: (formFields: IAddExophoneNumberFormFields) => void;
    isMutationLoading?: boolean;
    exophoneNumMenuOption: IKeyValue[];
    usersMenuOption: IKeyValue[];
}

export const AddExophoneNumberFormBase = (props: IAddExophoneNumberFormProps) => {
    const { onSubmit, togglePopup, isMutationLoading } = props;
    const [activeStep, setActiveStep] = React.useState(0);

    const form = useForm<IAddExophoneNumberFormFields>({
        mode: 'onChange'
    });

    const onSubmitForm = async (formValues: IAddExophoneNumberFormFields) => {
        onSubmit(formValues);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSaveHandler = () => {
        togglePopup();
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <FormProvider {...form}>
            <FlexBox gap="20px">
                <ConfigSteps activeStep={activeStep} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0 ? <AddExophoneNumberForm exophoneNumMenuOption={props.exophoneNumMenuOption} usersMenuOption={props.usersMenuOption} /> : <AccountWebhookDetails isMutationLoading={isMutationLoading} />}
            </FlexBox>
            <DialogActions sx={{ justifyContent: 'space-between', paddingTop: '30px' }}>
                {activeStep > 0 ?
                    <BackButton variant="outlined" onClick={handleBack}>
                        Back
                    </BackButton> : <div></div>
                }
                <FlexBox gap="10px">
                    <Button variant="outlined" onClick={togglePopup}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                        {isMutationLoading ? (
                            <CircularProgress size={20} />
                        ) : isLastStep ? 'Save' : 'Next'}
                    </Button>
                </FlexBox>
            </DialogActions>
        </FormProvider>
    )
}