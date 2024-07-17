import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FlexBox } from "lib/ui-ux";
import { TextboxField } from "lib/form-fields";
import { Box, Button, DialogActions, Divider, Step, StepLabel, Stepper } from "@mui/material";

interface IAddWhatsAppGupshupConfigFormProps {
    togglePopup: () => void;
}

interface IAddWhatsAppFormField {
    appName: string;
    appNumber: string;
    appAPIkey: string;
}

const steps = [
    {
        label: 'Account',
    },
    {
        label: 'Webhook',
    },
    {
        label: 'Permissions',
    }
];

const ConfigSteps = (props: { activeStep: number }) => {
    const { activeStep } = props;

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

const AccountDetailsForm = () => {
    return (
        <FlexBox flexDirection="column" gap="20px">
            <TextboxField name="appName" size="small" type="text" label="WhatsApp GupShup Name" rules={{ required: 'Name required' }} fullWidth/>
            <TextboxField name="appNumber" size="small" type="number" label="WhatsApp GupShup Number" rules={{ required: 'Number required' }} fullWidth/>
            <TextboxField name="appAPIkey" size="small" type="password" label="WhatsApp GupShup API key" rules={{ required: 'API key required' }} fullWidth/>
        </FlexBox>
    )
}

export const AddWhatsAppGupshupConfigForm = (props: IAddWhatsAppGupshupConfigFormProps) => {
    const { togglePopup } = props;
    const form = useForm<IAddWhatsAppFormField>();
    const [activeStep, setActiveStep] = React.useState(1);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    const isLastStep = activeStep === steps.length;
    console.log("activeStep", activeStep, "StepLength", steps.length, 'isLastStep', isLastStep);

    return (
        <>
            <FormProvider {...form}>
                <FlexBox gap="20px">
                    <ConfigSteps activeStep={activeStep} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {activeStep === 1 ? <AccountDetailsForm /> : <span>Work in Progress..</span>}
                </FlexBox>
                <DialogActions>
                    <Button variant="outlined" onClick={isLastStep ? handleBack : togglePopup}>
                        {isLastStep ? 'Back' : 'Cancel'}
                    </Button>
                    <Button variant="contained" autoFocus onClick={isLastStep ? togglePopup : handleNext}>
                        {isLastStep ? 'Save' : 'Next'}
                    </Button>
                </DialogActions>
            </FormProvider>
        </>
    )
}