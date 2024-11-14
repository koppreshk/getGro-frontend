import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid, DialogActions, Divider, Typography } from "@mui/material";
import { SelectFieldWithLabel, SwitchField, TextboxField, TextboxFieldWithLabel } from "lib/form-fields";
import { BackButton, CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { ConfigStepper } from "modules/settings/common";
import { IQueueMetadata } from "modules/settings/apis/ticket-automation/escalations/fetch-all-queues";
import { IFacebookAssociatedPages } from "modules/settings/apis/marketplace/facebook";

const steps = [
    {
        label: 'Page Configuration',
        description: 'Map facebook pages to specific groups, enabling you to manage chats.',
    },
    {
        label: 'Chat Configuration',
        description: 'Setup auto-reply features for whatsapp in getgro',
    }
];

function PageConfigurations(props: Pick<IAddFacebookPageFormProps, 'allQueues' | 'associatedPages'>) {
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxFieldWithLabel name="name" size="small" label={t('name')} type="text" fullWidth rules={{ required: 'This field is required.' }} placeholder="Enter Name" />
            </Grid>
            <Grid item md={12}>
                <SelectFieldWithLabel name="facebookPageName" size="small" label={t('facebook_page')} rules={{ required: 'This field is required.' }} menuOptions={props.associatedPages.map((item) => ({ key: item.page_id.toString(), value: item.page_name })) || []} />
            </Grid>
            <Grid item md={12}>
                <SelectFieldWithLabel name="queueId" size="small" label={t('queue')} fullWidth menuOptions={props.allQueues.map((item) => ({ key: item.id.toString(), value: item.name })) || []} placeholder="Select Queue" />
                <Typography variant="caption">Chats will automatically be assigned to the selected Queue</Typography>
            </Grid>

        </Grid>
    )
}

export interface IAddFacebookPageFormFields {
    name: string;
    whatsappBusinessID: string;
    phoneNumberID: string;
    sendAutoReply: boolean;
    queueId?: number | null;
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
                    {watch('sendAutoReply') ? <TextboxField name="autoReplyMessage" label={t("auto_reply_message")} multiline rows={4} /> : null}
                </FlexBox>
            </FlexBox>
        </>
    )
}

export interface IAddFacebookPageFormProps {
    isMutationLoading?: boolean;
    defaultValues?: IAddFacebookPageFormFields;
    allQueues: IQueueMetadata[];
    associatedPages: IFacebookAssociatedPages[];
    togglePopup: () => void;
    onSubmit: (formData: IAddFacebookPageFormFields) => void;
}

export const AddFacebookPageFormBase = (props: IAddFacebookPageFormProps) => {
    const { togglePopup, isMutationLoading = false, onSubmit, defaultValues } = props;
    const { t } = useTranslation();

    const [activeStep, setActiveStep] = React.useState(0);

    const form = useForm<IAddFacebookPageFormFields>({
        mode: 'onChange',
        defaultValues: defaultValues
    });

    const onSubmitForm = async (formFields: IAddFacebookPageFormFields) => {
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
                    ? <PageConfigurations allQueues={props.allQueues} associatedPages={props.associatedPages} />
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