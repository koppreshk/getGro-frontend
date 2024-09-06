import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { PasswordField, TextboxField } from "lib/form-fields";
import { Box, Button, DialogActions, Divider, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";

interface IAddShopifyStoreFormProps {
    togglePopup: () => void;
}

export const AddShopifyStoreForm = (props: IAddShopifyStoreFormProps) => {
    const { togglePopup } = props;
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
            <FormProvider {...form}>
                <FlexBox gap="20px">
                    <ShopifyConfigSteps activeStep={activeStep} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    {activeStep === 0 ? <ShopifyDetailsForm /> : <span>Work in Progress..</span>}
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

const ShopifyEndURL = styled(Typography)`
    padding: 8px;
    background: ${({ theme }) => theme.pallete.grayVariant4};
    border-radius: 0px 4px 4px 0px;
`;

const ShopifyDetailsForm = () => {
    return (
        <FlexBox flexDirection="column" gap="20px">
            <TextboxField name="storeName" size="small" label="Store Name" sx={{ minWidth: '400px' }} rules={{ required: 'Store name required' }} />
            <FlexBox>
                <TextboxField name="storeUrl" size="small" sx={{ width: '100%', borderRight: '0px' }} label="Store URL" autoComplete="off" rules={{ required: 'Store url required' }} />
                <ShopifyEndURL variant="body3">.myshopify.com</ShopifyEndURL>
            </FlexBox>
            <PasswordField name="accessToken" size="small" type="password" label="Access Token" rules={{ required: 'Access token required' }} />
        </FlexBox>
    )
}