import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";
import { Close } from "@mui/icons-material";

interface IAddStoreDialogProps {
    open: boolean;
    onClose: () => void;
}

export const AddStoreDialog = (props: IAddStoreDialogProps) => {
    const { onClose, open } = props;
    const form = useForm();

    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <>
            <Dialog onClose={onClose} open={open} PaperProps={{ sx: { width: '800px', maxWidth: 'unset' } }}>
                <DialogTitle>Add Store</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
                <FormProvider {...form}>
                    <DialogContent>
                        <FlexBox gap="20px">
                            <ShopifyConfigSteps activeStep={activeStep} />
                            <Divider orientation="vertical" variant="middle" flexItem />
                            {activeStep === 0 ? <ShopifyDetailsForm /> : <span>Work in Progress..</span>}
                        </FlexBox>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={isLastStep ? handleBack : onClose}>
                            {isLastStep ? 'Back' : 'Cancel'}
                        </Button>
                        <Button variant="contained" autoFocus onClick={isLastStep ? onClose : handleNext}>
                            {isLastStep ? 'Save' : 'Next'}
                        </Button>
                    </DialogActions>
                </FormProvider>
            </Dialog>
        </>
    )
}

const steps = [
    {
        label: 'Account',
        description: `Connect shopify store with getgro`,
    },
    {
        label: 'Permissions',
        description: 'Setup visibility to limit access to certain roles',
    }
];

const ShopifyConfigSteps = (props: { activeStep: number }) => {
    const { activeStep } = props;
    return (
        <>
            <Box sx={{ width: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body3">{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Stepper>
            </Box>
        </>
    )
}

const ShopifyDetailsForm = () => {
    return (
        <FlexBox flexDirection="column" gap="20px">
            <TextboxField name="storeName" size="small" label="Store Name" sx={{ minWidth: '400px' }} rules={{ required: 'Store name required' }} />
            <TextboxField name="storeUrl" size="small" label="Store URL" rules={{ required: 'Store url required' }} />
            <TextboxField name="accessToken" size="small" type="password" label="Access Token" rules={{ required: 'Access token required' }} />
        </FlexBox>
    )
}