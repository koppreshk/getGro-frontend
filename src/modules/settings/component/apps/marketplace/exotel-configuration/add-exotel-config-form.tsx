import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, DialogActions, Divider, Grid, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { FlexBox } from "lib/ui-ux";

interface IAddExotelConfigurationFormProps {
    togglePopup: () => void;
}

export const AddExotelConfigurationForm = (props: IAddExotelConfigurationFormProps) => {
    const { togglePopup } = props;
    const form = useForm();
    const [activeStep, setActiveStep] = React.useState(0);

    const onSubmitForm = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSaveHandler = () => {
        togglePopup();
    };

    const isLastStep = activeStep === steps.length;

    return (
        <FormProvider {...form}>
            <FlexBox gap="20px">
                <ConfigSteps activeStep={activeStep} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0 ? <AddExotelConfigForm /> : <></>}
            </FlexBox>
            <DialogActions sx={{ justifyContent: 'space-between', paddingTop: '30px' }}>
                {activeStep > 0 ?
                    <Button variant="outlined" onClick={handleBack}>
                        Back
                    </Button> : <div></div>
                }
                <FlexBox gap="10px">
                    <Button variant="outlined" onClick={togglePopup}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                        {isLastStep ? 'Save' : 'Next'}
                    </Button>
                </FlexBox>
            </DialogActions>
        </FormProvider>
    )
}


const steps = [
    {
        label: 'Account',
        description: `Set up an Exotel account to link Exotel with BoldDesk.`,
    },
    {
        label: 'Permissions',
        description: 'Setup visibility to limit access to certain roles',
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
                        <StepContent>
                            <Typography variant="body3">{step.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

function AddExotelConfigForm() {
    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxField name="domain" label="Exotel Domain" size="small" type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="accountSID" label="Exotel Account SID" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="apiKey" label="Exotel API Key" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="apiToken" label="Exotel API Token" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            {/* <Grid item md={12}>
                <Button variant="contained">Verify Exotel Account</Button>
            </Grid> */}
        </Grid>
    )
}