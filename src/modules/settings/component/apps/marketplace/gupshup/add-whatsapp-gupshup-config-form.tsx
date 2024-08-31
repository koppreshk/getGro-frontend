import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { FlexBox } from "lib/ui-ux";
import { TextboxField } from "lib/form-fields";
import { Box, Button, CircularProgress, DialogActions, Divider, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useAppSelector } from "lib/hooks";

export interface IWhatsAppGupshupConfigFormProps {
    togglePopup: () => void;
    onSubmit: (formFields: IAddWhatsAppFormField) => void;
    isMutationLoading?: boolean;
    updateInstallation: () => void;
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
            <TextboxField name="appAPIkey" size="small" type="password" label="WhatsApp GupShup API key" rules={{ required: 'API key required' }} fullWidth autoComplete="off" />
        </FlexBox>
    )
}

const AccountWebhookDetails = () => {
    return (
        <FlexBox flexDirection="column" gap="20px" width="75%">
            <Typography variant="h5">Webhook</Typography>
            <TextboxField name="webhookURL" size="small" type="text" label="Webhook URL" fullWidth />
        </FlexBox>
    )
}

export const WhatsAppGupshupConfigForm = (props: IWhatsAppGupshupConfigFormProps) => {
    const { togglePopup, onSubmit, isMutationLoading, updateInstallation } = props;
    const form = useFormContext<IAddWhatsAppFormField>()
    const [activeStep, setActiveStep] = React.useState(0);
    const webHookUrl = useAppSelector((state) => state.configurations.whatsAppWebhookUrl);

    React.useEffect(() => {
        if (webHookUrl) {
            form.setValue('webhookURL', webHookUrl);
        }
    }, [form, webHookUrl]);

    const onSubmitForm = async (formValues: IAddWhatsAppFormField) => {
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
                {activeStep === 0 ? <AccountDetailsForm /> : <AccountWebhookDetails />}
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
                            <CircularProgress size={24} />
                        ) : isLastStep ? 'Save' : 'Next'}
                    </Button>
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