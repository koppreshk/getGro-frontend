import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid, DialogActions, Divider, Typography } from "@mui/material";
import { SwitchField, TextboxField, TextboxFieldWithLabel } from "lib/form-fields";
import { BackButton, CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { ConfigStepper } from "modules/settings/common";

const steps = [
    {
        label: 'Account Configuration',
        description: 'Map businees phone numbers which enables you to manage chats',
    },
    {
        label: 'Chat Configuration',
        description: 'Setup auto-reply features for whatsapp in getgro',
    }
];

function AccountConfigurations() {
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxFieldWithLabel name="name" size="small" label={t('name')} type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxFieldWithLabel name="whatsappBusinessID" size="small" label={t('whatsapp_business_id')} rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <TextboxFieldWithLabel name="phoneNumberID" size="small" label={t('phone_number_id')} rules={{ required: 'This field is required.' }} />
            </Grid>
        </Grid>
    )
}

export interface IAddWhatsAppNumberFormFields {
    name: string;
    whatsappBusinessID: string;
    phoneNumberID: string;
    sendAutoReply: boolean;
    autoReplyMessage: string;
}

const ChatConfiguration = () => {
    const { t } = useTranslation();
    const { watch } = useFormContext();
    return (
        <>
            <FlexBox flexDirection="row" gap="20px" width="75%">
                <SwitchField name="sendAutoReply" />
                <FlexBox flexDirection="column" gap={'20px'}>
                    <FlexBox flexDirection="column" >
                        <Typography variant="h6">{t('auto_reply')}</Typography>
                        <Typography variant="body3">{t('auto_reply_description')}</Typography>
                    </FlexBox>
                    {watch('sendAutoReply') ? <TextboxField name="autoReplyMessage" label={t("auto_reply_message")} multiline rows={4}/> : null}
                </FlexBox>
            </FlexBox>
        </>
    )
}

export interface IAddWhatsAppNumberFormProps {
    isMutationLoading?: boolean;
    defaultValues?: IAddWhatsAppNumberFormFields;
    togglePopup: () => void;
    onSubmit: (formData: IAddWhatsAppNumberFormFields) => void;
}

export const AddWhatsAppNumberFormBase = (props: IAddWhatsAppNumberFormProps) => {
    const { togglePopup, isMutationLoading = false, onSubmit, defaultValues } = props;
    const { t } = useTranslation();

    const [activeStep, setActiveStep] = React.useState(0);

    const form = useForm<IAddWhatsAppNumberFormFields>({
        mode: 'onChange',
        defaultValues: defaultValues
    });

    const onSubmitForm = async (formFields: IAddWhatsAppNumberFormFields) => {
        onSubmit(formFields);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const isLastStep = activeStep === steps.length - 1;

    return (
        <FormProvider {...form}>
            <FlexBox gap="20px">
                <ConfigStepper activeStep={activeStep} steps={steps} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0
                    ? <AccountConfigurations />
                    : <ChatConfiguration />}
            </FlexBox>
            <DialogActions sx={{ justifyContent: 'space-between', paddingTop: '30px' }}>
                {activeStep > 0 ?
                    <BackButton variant="outlined" onClick={handleBack} />
                    : <div></div>
                }
                <FlexBox gap="10px">
                    <CancelButton onClick={togglePopup} />
                    <LoadingButton isLoading={isMutationLoading} variant="contained" onClick={isLastStep ? form.handleSubmit(onSubmitForm) : handleNext}>
                        {isLastStep ? t('save') : t('next')}
                    </LoadingButton>
                </FlexBox>
            </DialogActions>
        </FormProvider>
    )
}