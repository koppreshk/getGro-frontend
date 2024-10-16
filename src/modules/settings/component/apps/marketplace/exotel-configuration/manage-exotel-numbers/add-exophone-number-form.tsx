import React from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Grid, DialogActions, Divider, InputAdornment } from "@mui/material";
import { AutocompleteField, SelectField, TextboxField } from "lib/form-fields";
import { BackButton, CancelButton, CustomIconButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { IAddExophoneNumberFormFields } from "modules/settings/containers/marketplace/exotel";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { IUsers } from "modules/settings/apis/users-and-permissions";
import { Exophone, IAddExophoneNumber, IExotelConfigDetails } from "modules/settings/apis/marketplace/exotel";
import { ContentCopy } from "@mui/icons-material";
import { useNotifications } from "lib";
import { useTranslation } from "react-i18next";

const steps = [
    {
        label: 'Add Exophone Number',
        description: '',
    },
    {
        label: 'Webhook',
        description: '',
    }
];

const ConfigSteps = (props: {
    activeStep: number, steps: {
        label: string;
        description: string;
    }[]
}) => {
    const { activeStep, steps } = props;

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>
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

function AddExophoneNumberForm(props: {
    exophoneNumMenuOption: IKeyValue[];
    usersMenuOption: IKeyValue[];
    isBrowserCalling: boolean;
}) {
    const { exophoneNumMenuOption, usersMenuOption, isBrowserCalling } = props;
    const { t } = useTranslation();

    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxField name="appName" size="small" label={isBrowserCalling ? "Group Name" : t('name')} type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <SelectField name="phoneNumber" size="small" label="Select Exotel Number" sx={{ width: '100%' }} menuOptions={exophoneNumMenuOption} rules={{ required: 'This field is required.' }} />
            </Grid>
            {isBrowserCalling ?
                <Grid item md={12}>
                    <AutocompleteField label="Select Users in Group" name="users" options={usersMenuOption} placeholder="Select Employee" size="small" />
                </Grid> : null}
        </Grid>
    )
}


const AccountWebhookDetails = () => {
    const { showNotification } = useNotifications();
    const { watch } = useFormContext<IAddExophoneNumberFormFields>();

    const onCopy = () => {
        navigator.clipboard.writeText(watch('webHookUrl')!)
            .then(() => showNotification({ message: 'Copied to clipboard', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to copy', type: 'error' }));
    }

    return (
        <>
            <FlexBox flexDirection="column" gap="20px" width="75%">
                <Typography variant="h5">Webhook</Typography>
                <TextboxField
                    label="Webhook URL"
                    name="webHookUrl"
                    size="small"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    disabled
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                <CustomIconButton onClick={onCopy} iconComponent={<ContentCopy />} tooltipProps={{ title: "Copy pop-up url", arrow: true }} />
                            </InputAdornment>
                        )
                    }}
                />
            </FlexBox >
        </>
    )
}

interface IKeyValue {
    key: string;
    value: string;
}

export interface IAddExophoneNumberFormProps {
    togglePopup: () => void;
    onSubmit: (payload: IAddExophoneNumber) => Promise<{ create_pop_url: string }>;
    isMutationLoading?: boolean;
    allUsersData: IUsers[];
    exophoneNumData: Exophone[];
    exotelConfigDetails: IExotelConfigDetails;
}

export const AddExophoneNumberFormBase = (props: IAddExophoneNumberFormProps) => {
    const { togglePopup, isMutationLoading, allUsersData, exophoneNumData, onSubmit } = props;
    const isBrowserCalling = props.exotelConfigDetails.account_type === 'browser_calling';
    const { t } = useTranslation();

    //Remove webhook step if its NOT broswer calling
    const modifiedSteps = !isBrowserCalling ? steps.filter((item) => item.label !== 'Webhook') : steps;

    const [activeStep, setActiveStep] = React.useState(0);

    const exophoneNumMenuOption = exophoneNumData ? exophoneNumData.map((item) => ({ key: item.phone_number, value: item.phone_number })) : [];
    const usersMenuOption = allUsersData ? allUsersData.map((item) => ({ key: item.id.toString(), value: item.name })) : [];

    const form = useForm<IAddExophoneNumberFormFields>({
        mode: 'onChange',
        defaultValues: {
            appName: '',
            friendlyName: '',
            phoneNumber: '',
            sid: '',
            users: [],
            webHookUrl: ''
        }
    });

    const onSubmitForm = async (formFields: IAddExophoneNumberFormFields) => {
        const phone = exophoneNumData.find(item => item.phone_number === form.watch('phoneNumber'));
        onSubmit({
            app_name: formFields.appName,
            friendly_name: phone?.friendly_name || '',
            phone_number: formFields.phoneNumber,
            sid: phone?.sid || '',
            users: isBrowserCalling ? formFields.users.map((x) => Number(x.key)) : undefined
        }).then((res) => {
            if (!isBrowserCalling) {
                onSaveHandler();
                return;
            }
            form.setValue('webHookUrl', res.create_pop_url);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSaveHandler = () => {
        togglePopup();
    };

    const isLastStep = activeStep === modifiedSteps.length - 1;

    return (
        <FormProvider {...form}>
            <FlexBox gap="20px">
                <ConfigSteps activeStep={activeStep} steps={modifiedSteps} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0 ? <AddExophoneNumberForm exophoneNumMenuOption={exophoneNumMenuOption} usersMenuOption={usersMenuOption} isBrowserCalling={isBrowserCalling} /> : <AccountWebhookDetails />}
            </FlexBox>
            <DialogActions sx={{ justifyContent: 'space-between', paddingTop: '30px' }}>
                {activeStep > 0 ?
                    <BackButton variant="outlined" onClick={handleBack} />
                    : <div></div>
                }
                <FlexBox gap="10px">
                    <CancelButton onClick={togglePopup} />
                    <LoadingButton isLoading={isMutationLoading!} variant="contained" onClick={!isBrowserCalling ? form.handleSubmit(onSubmitForm) : isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                        {isLastStep ? t('save') : t('next')}
                    </LoadingButton>
                </FlexBox>
            </DialogActions>
        </FormProvider>
    )
}