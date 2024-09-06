import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { BackButton, CustomIconButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { PasswordField, TextboxField } from "lib/form-fields";
import { Box, Button, DialogActions, Divider, InputAdornment, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useNotifications } from "lib";
import { ISetupWhatsAppArgs } from "modules/settings/apis/marketplace/whatsApp/gupshup";

export interface IWhatsAppGupshupConfigFormProps {
    togglePopup: () => void;
    isMutationLoading: boolean;
    onSubmit: (formValues: ISetupWhatsAppArgs) => Promise<{ webhook_url: string }>
    updateInstallation: () => void;
    mode: 'edit' | 'add';
}

export interface IAddWhatsAppFormField {
    appName: string;
    appNumber: string;
    appAPIkey: string;
    appId: string;
    webhookURL: string;
}

const steps = [
    {
        label: 'Account',
    },
    {
        label: 'Webhook',
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
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

const AccountDetailsForm = () => {
    return (
        <FlexBox flexDirection="column" gap="30px" width="75%">
            <TextboxField name="appName" size="small" type="text" label="WhatsApp GupShup Name" rules={{ required: 'Name required' }} fullWidth />
            <TextboxField name="appNumber" size="small" type="number" label="WhatsApp GupShup Number" rules={{ required: 'Number required' }} fullWidth />
            <TextboxField name="appId" size="small" type="text" label="WhatsApp Id" fullWidth autoComplete="off" />
            <PasswordField name="appAPIkey" size="small" type="password" label="WhatsApp GupShup API key" rules={{ required: 'API key required' }} fullWidth autoComplete="off" />
        </FlexBox>
    )
}

const AccountWebhookDetails = () => {
    const { showNotification } = useNotifications();
    const { watch } = useFormContext<IAddWhatsAppFormField>();

    const onCopy = () => {
        navigator.clipboard.writeText(watch('webhookURL')!)
            .then(() => showNotification({ message: 'Copied to clipboard', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to copy', type: 'error' }));
    }

    return (
        <FlexBox flexDirection="column" gap="20px" width="75%">
            <Typography variant="h5">Webhook</Typography>
            <TextboxField
                name="webhookURL"
                label="Webhook URL"
                size="small" type="text"
                fullWidth
                disabled
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" >
                            <CustomIconButton onClick={onCopy} iconComponent={<ContentCopy />} tooltipProps={{ title: "Copy Webhook url", arrow: true }} />
                        </InputAdornment>
                    )
                }}
            />
        </FlexBox>
    )
}

export const WhatsAppGupshupConfigForm = (props: IWhatsAppGupshupConfigFormProps) => {
    const { togglePopup, onSubmit, isMutationLoading, updateInstallation } = props;
    const form = useFormContext<IAddWhatsAppFormField>()
    const [activeStep, setActiveStep] = React.useState(0);

    const onSubmitForm = async (formValues: IAddWhatsAppFormField) => {
        onSubmit({
            api_key: formValues.appAPIkey,
            app_id: formValues.appId,
            app_name: formValues.appName,
            number: formValues.appNumber,
        }).then((response) => {
            console.log('whatsapp res', response);
            form.setValue('webhookURL', response.webhook_url);
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
                {activeStep === 0 ? <AccountDetailsForm /> : <AccountWebhookDetails />}
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
                    <LoadingButton variant="contained" isLoading={isMutationLoading} onClick={isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                        {isLastStep ? 'Save' : 'Next'}
                    </LoadingButton>
                </FlexBox>
            </DialogActions>
        </form>
    )
}


interface IAddWhatsAppGupshupConfigFormProps extends IWhatsAppGupshupConfigFormProps { }

export const AddWhatsAppGupshupConfigFormBase = (props: IAddWhatsAppGupshupConfigFormProps) => {
    const form = useForm<IAddWhatsAppFormField>({
        defaultValues: {
            appAPIkey: '',
            appId: '',
            appName: '',
            appNumber: '',
            webhookURL: ''
        }
    });

    return (
        <FormProvider {...form}>
            <WhatsAppGupshupConfigForm {...props} />
        </FormProvider>
    )
}