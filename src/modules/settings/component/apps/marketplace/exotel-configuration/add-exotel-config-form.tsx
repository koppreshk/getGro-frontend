import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box, Button, CircularProgress, DialogActions, Divider, Grid, InputAdornment, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { RadioGroupField, TextboxField } from "lib/form-fields";
import { BackButton, CenteredCircularProgress, CustomIconButton, FlexBox } from "lib/ui-ux";
import { IAddExotelFormFields } from "modules/settings/containers/marketplace/exotel";
import { useAppSelector } from "lib/hooks";
import { ContentCopy } from "@mui/icons-material";
import { useNotifications } from "lib";

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
                <TextboxField name="exotelSubdomain" label="Exotel Sub Domain" size="small" type="text" fullWidth rules={{ required: 'Exotel Sub Domain field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="exotelAccountSid" label="Exotel Account SID" size="small" fullWidth rules={{ required: 'Exotel Account SID field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="exotelAPIkey" type="password" label="Exotel API Key" size="small" fullWidth rules={{ required: 'Exotel API Key field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxField name="exotelAPItoken" type="password" label="Exotel API Token" size="small" fullWidth rules={{ required: 'Exotel API Token field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <Typography variant="h6">Account Type</Typography>
                <RadioGroupField name="accountType" radioOptions={[{ key: 'browser_calling', label: 'Browser Calling' }, { key: 'normal_calling', label: 'Normal Calling(Phone)' }]} />
            </Grid>
        </Grid>
    )
}

const AccountWebhookDetails = (props: { isMutationLoading: boolean | undefined }) => {
    const { showNotification } = useNotifications();
    const { watch } = useFormContext();

    const onCopy = () => {
        navigator.clipboard.writeText(watch('webHookUrl'))
            .then(() => showNotification({ message: 'Copied to clipboard', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to copy', type: 'error' }));
    }

    return (
        <>
            {props.isMutationLoading ? <CenteredCircularProgress /> :
                <FlexBox flexDirection="column" gap="20px" width="75%">
                    <Typography variant="h5">Webhook</Typography>
                    <TextboxField
                        name="webhookURL"
                        size="small"
                        type="text"
                        rows={4}
                        multiline
                        disabled
                        readOnly
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                    <CustomIconButton onClick={onCopy} iconComponent={<ContentCopy />} tooltipProps={{ title: "Copy pop-up url", arrow: true }} />
                                </InputAdornment>
                            )
                        }}
                        label="Webhook URL" fullWidth />
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
                    <BackButton variant="outlined" onClick={handleBack}>
                        Back
                    </BackButton> : <div></div>
                }
                {webHookUrl ? null :
                    <FlexBox gap="10px">
                        <Button variant="outlined" onClick={togglePopup}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                            {isMutationLoading ? (
                                <CircularProgress size={20} />
                            ) : isLastStep ? 'Save' : 'Next'}
                        </Button>
                    </FlexBox>}
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
            webhookURL: '',
            accountType: 'browser_calling'
        }
    });

    return (
        <FormProvider {...form}>
            <AddExotelConfigurationForm {...props} />
        </FormProvider>
    )
}