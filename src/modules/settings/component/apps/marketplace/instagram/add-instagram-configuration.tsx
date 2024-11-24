import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DialogActions, Divider, Typography } from "@mui/material";
import { RadioGroupField, SelectFieldWithLabel, SwitchField, TextboxField } from "lib/form-fields";
import { BackButton, CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { ConfigStepper } from "modules/settings/common";
import { IQueueMetadata } from "modules/settings/apis/ticket-automation/escalations/fetch-all-queues";
import { StyledTagInputField } from "modules/tickets/components/ticket-details/ticket-list-view/add-ticket/add-ticket-form";

const steps = [
    {
        label: 'Comment Configuration',
        description: 'Configure the comments feature for Instagram in Getgro.',
    },
    {
        label: 'Messenger & Queue Configuration',
        description: 'Set up the auto-reply features and queue configuration for Instagram in Getgro.',
    }
];

const MessengerConfiguration = (props: Pick<IAddInstagramConfigurationFormProps, 'allQueues'>) => {
    const { t } = useTranslation();
    const { watch } = useFormContext();
    return (
        <>
            <FlexBox flexDirection="column" gap="20px" width="75%">
                <FlexBox gap="20px" >
                    <FlexBox flexDirection="column">
                        <FlexBox gap={'10px'} alignItems="center">
                            <Typography variant="h6">{t('auto_reply')}</Typography>
                            <SwitchField name="sendAutoReply" size="small"/>
                        </FlexBox>
                        <Typography variant="body3">{t('auto_reply_description')}</Typography>
                        {watch('sendAutoReply') ? <TextboxField sx={{ mt: '20px' }} name="autoReplyMessage" label={t("auto_reply_message")} multiline rows={4} /> : null}
                    </FlexBox>
                </FlexBox>
                <FlexBox flexDirection="column" gap={'5px'}>
                    <SelectFieldWithLabel name="queueId" size="small" label={t('queue')} fullWidth menuOptions={props.allQueues.map((item) => ({ key: item.id.toString(), value: item.name })) || []} placeholder="Select Queue" rules={{ required: t('selection_is_required') }} />
                    <Typography variant="caption">Chats will automatically be assigned to the selected Queue</Typography>
                </FlexBox>
            </FlexBox>
        </>
    )
}

const CommentConfiguration = () => {
    const { t } = useTranslation();
    const { watch } = useFormContext();

    const renderContentBelowLabel = () => {
        return (
            <>
                {
                    watch('commentsConfiguration') === 'specific_keywords'
                        ?
                        <FlexBox flexDirection="column" gap={'20px'} padding={'0 0 0 27px'}>
                            <Typography variant="body3">{'If you turn this feature on, comment with specific keywords for your post will be converted into conversation'}</Typography>
                            <StyledTagInputField
                                name="keywords"
                                gap={"15px"}
                                dontShowDashes
                                placeholder="Add your keywords here..." />
                        </FlexBox>
                        : null
                }
            </>
        )
    }

    return (
        <>
            <FlexBox flexDirection="row" gap="20px" width="75%">
                <RadioGroupField
                    name="commentsConfiguration"
                    row={false}
                    radioOptions={[
                        { key: 'all_posts', label: t('all_posts'), renderContentBelowLabel: 'If you turn this feature on, all comments received on your posts will be converted into conversations' },
                        { key: 'specific_keywords', label: t('comments_specific_keywords'), renderContentBelowLabel: renderContentBelowLabel }]} />
            </FlexBox>
        </>
    )
}

export interface IAddInstagramConfigurationFormFields {
    queueId: number;
    commentsConfiguration: string;
    sendAutoReply: boolean;
    autoReplyMessage: string;
    keywords: string[];
}


export interface IAddInstagramConfigurationFormProps {
    isMutationLoading?: boolean;
    defaultValues?: IAddInstagramConfigurationFormFields;
    allQueues: IQueueMetadata[];
    togglePopup: () => void;
    onSubmit: (formData: IAddInstagramConfigurationFormFields) => void;
}

export const AddInstagramConfigurationFormBase = (props: IAddInstagramConfigurationFormProps) => {
    const { togglePopup, isMutationLoading = false, onSubmit, defaultValues } = props;
    const { t } = useTranslation();

    const [activeStep, setActiveStep] = React.useState(0);

    const form = useForm<IAddInstagramConfigurationFormFields>({
        mode: 'onChange',
        defaultValues: defaultValues
    });

    const onSubmitForm = async (formFields: IAddInstagramConfigurationFormFields) => {
        onSubmit(formFields);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = async () => {
        const isFormValidated = await form.trigger();
        if (isFormValidated) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }

    const isLastStep = activeStep === steps.length - 1;

    const renderBasedOnStep = () => {
        switch (activeStep) {
            case 0:
                return <CommentConfiguration />
            default: return <MessengerConfiguration allQueues={props.allQueues} />
        }
    }

    return (
        <FormProvider {...form}>
            <FlexBox gap="20px">
                <ConfigStepper activeStep={activeStep} steps={steps} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {renderBasedOnStep()}
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