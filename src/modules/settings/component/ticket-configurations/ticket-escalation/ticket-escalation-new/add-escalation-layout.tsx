import React from "react";
import { Stepper, Box, Step, StepLabel, Typography, Button, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { AddReminder } from "./add-reminder";
import { AddEscalation } from "./add-escalation";

const steps = [
    {
        label: 'Choose Condition',
    },
    {
        label: 'SLA Targets',
    },
    {
        label: 'Add Reminders',
    },
    {
        label: 'Add Escalation',
    }
];

export const AddEscalationLayout = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const form = useForm();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isLastStep = activeStep === steps.length - 1;

    const onClose = () => navigate(-1);
    console.log(activeStep);

    return (
        <Box sx={{ p: '0px 20px', mb: '10px' }}>
            <FormProvider {...form}>
                <AddEscalaltionSteps activeStep={activeStep} />
                {
                    activeStep === 0
                        ? <ChooseCondition />
                        : activeStep === 1
                            ? <span>SLA Target</span>
                            : activeStep === 2
                                ? <AddReminder />
                                : <AddEscalation/>
                }
                <DialogActions>
                    <Button variant="outlined" onClick={isLastStep ? handleBack : onClose}>
                        {isLastStep ? 'Back' : 'Cancel'}
                    </Button>
                    <Button variant="contained" autoFocus onClick={isLastStep ? onClose : handleNext}>
                        {isLastStep ? 'Save' : 'Next'}
                    </Button>
                </DialogActions>
            </FormProvider>
        </Box>
    )
}

const AddEscalaltionSteps = (props: { activeStep: number }) => {
    const { activeStep } = props;
    return (
        <>
            <Box>
                <Stepper activeStep={activeStep} orientation="horizontal">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 3 ? (
                                        <Typography variant="body3">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    )
}

const ChooseCondition = () => {
    return (
        <span>Test</span>
    )
}