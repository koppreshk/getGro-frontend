import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box, Button, CircularProgress, DialogActions, Divider, Grid, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { CenteredCircularProgress, FlexBox } from "lib/ui-ux";
import { IAddExotelFormFields } from "modules/settings/containers/marketplace/exotel";
import { useAppSelector } from "lib/hooks";

export interface IAddExotelConfigurationFormProps {
    togglePopup: () => void;
    onSubmit: (formFields: IAddExotelFormFields) => void;
    isMutationLoading?: boolean;
    updateInstallation: () => void;
}

const steps = [
    {
        label: 'Account',
        description: `Set up an Exotel account to link Exotel with GetGro`,
    },
    {
        label: 'Webhook',
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
                <TextboxField name="exotelSubdomain" label="Exotel Domain" size="small" type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="exotelAccountSid" label="Exotel Account SID" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="exotelAPIkey" type="password" label="Exotel API Key" size="small" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="exotelAPItoken" type="password" label="Exotel API Token" size="small" fullWidth rules={{ required: 'This field is required.' }} />
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

export const AddExotelConfigurationForm = (props: IAddExotelConfigurationFormProps) => {
    const { togglePopup, onSubmit, isMutationLoading, updateInstallation } = props;
    const form = useFormContext<IAddExotelFormFields>()
    const [activeStep, setActiveStep] = React.useState(0);
    const webHookUrl = useAppSelector((state) => state.configurations.exotelWebhookUrl);

    React.useEffect(() => {
        if (webHookUrl) {
            form.setValue('webhookURL', webHookUrl);
        }
    }, [form, webHookUrl]);

    const onSubmitForm = async (formValues: IAddExotelFormFields) => {
        onSubmit(formValues);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSaveHandler = () => {
        togglePopup();
        updateInstallation();
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <form autoComplete="off">
            <FlexBox gap="20px">
                <ConfigSteps activeStep={activeStep} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0 ? <AddExotelConfigForm /> : <AccountWebhookDetails isMutationLoading={isMutationLoading} />}
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
                        {isMutationLoading ? (
                            <CircularProgress size={20} />
                        ) : isLastStep ? 'Save' : 'Next'}
                    </Button>
                </FlexBox>
            </DialogActions>
        </form>
    )
}

export const AddExotelConfigurationFormBase = (props: IAddExotelConfigurationFormProps) => {
    const form = useForm<IAddExotelFormFields>({
        defaultValues: {
            exotelAccountSid: '',
            exotelAPIkey: '',
            exotelAPItoken: '',
            exotelSubdomain: '',
            webhookURL: ''
        }
    });

    return (
        <FormProvider {...form}>
            <AddExotelConfigurationForm {...props} />
        </FormProvider>
    )
}