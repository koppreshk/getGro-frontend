import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box, Button, DialogActions, Divider, Grid, InputAdornment, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { PasswordField, RadioGroupField, TextboxField } from "lib/form-fields";
import { BackButton, CustomIconButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { IAddExotelFormFields } from "modules/settings/containers/marketplace/exotel";
import { ContentCopy } from "@mui/icons-material";
import { useNotifications } from "lib";
import { IExotelConfigDetails } from "modules/settings/apis/marketplace/exotel";

export interface IAddExotelConfigurationFormProps {
    isMutationLoading: boolean;
    togglePopup: () => void;
    onSubmit: (data: IExotelConfigDetails) => Promise<{ webhook_url: string }>;
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
                <PasswordField name="exotelAPIkey" type="password" label="Exotel API Key" size="small" fullWidth rules={{ required: 'Exotel API Key field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <PasswordField name="exotelAPItoken" type="password" label="Exotel API Token" size="small" fullWidth rules={{ required: 'Exotel API Token field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <Typography variant="h6">Account Type</Typography>
                <RadioGroupField name="accountType" radioOptions={[{ key: 'browser_calling', label: 'Browser Calling' }, { key: 'normal_calling', label: 'Normal Calling(Phone)' }]} />
            </Grid>
        </Grid>
    )
}

const AccountWebhookDetails = () => {
    const { showNotification } = useNotifications();
    const { watch } = useFormContext<IAddExotelFormFields>();

    const onCopy = () => {
        navigator.clipboard.writeText(watch('webhookURL')!)
            .then(() => showNotification({ message: 'Copied to clipboard', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to copy', type: 'error' }));
    }

    return (
        <>
            <FlexBox flexDirection="column" gap="20px" width="75%">
                <Typography variant="h5">Webhook</Typography>
                <TextboxField
                    name="webhookURL"
                    size="small"
                    type="text"
                    rows={4}
                    multiline
                    disabled
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                <CustomIconButton onClick={onCopy} iconComponent={<ContentCopy />} tooltipProps={{ title: "Copy pop-up url", arrow: true }} />
                            </InputAdornment>
                        )
                    }}
                    label="Webhook URL" fullWidth />
            </FlexBox>
        </>
    )
}

export const AddExotelConfigurationForm = React.memo((props: IAddExotelConfigurationFormProps) => {
    const { togglePopup, onSubmit, isMutationLoading, updateInstallation } = props;
    const form = useFormContext<IAddExotelFormFields>()
    const [activeStep, setActiveStep] = React.useState(0);

    const onSubmitForm = async (formFields: IAddExotelFormFields) => {
        onSubmit({
            exotel_account_sid: formFields.exotelAccountSid,
            exotel_api_key: formFields.exotelAPIkey,
            exotel_api_token: formFields.exotelAPItoken,
            exotel_subdomain: formFields.exotelSubdomain,
            account_type: formFields.accountType
        }).then((res) => {
            form.setValue('webhookURL', res.webhook_url)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
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
                {activeStep === 0 ? <AddExotelConfigForm /> : <AccountWebhookDetails />}
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
                    <LoadingButton isLoading={isMutationLoading} variant="contained" onClick={isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                        {isLastStep ? 'Save' : 'Next'}
                    </LoadingButton>
                </FlexBox>
            </DialogActions>
        </form>
    )
})

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