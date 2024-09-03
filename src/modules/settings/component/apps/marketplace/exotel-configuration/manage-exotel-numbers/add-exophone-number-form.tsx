import React from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Typography, Grid, Button, CircularProgress, DialogActions, Divider, InputAdornment } from "@mui/material";
import { AutocompleteField, SelectField, TextboxField } from "lib/form-fields";
import { BackButton, CenteredCircularProgress, CustomIconButton, FlexBox } from "lib/ui-ux";
import { IAddExophoneNumberFormFields } from "modules/settings/containers/marketplace/exotel";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { IUsers } from "modules/settings/apis/users-and-permissions";
import { Exophone } from "modules/settings/apis/marketplace/exotel";
import { useAppSelector } from "lib/hooks";
import { ContentCopy } from "@mui/icons-material";
import { useNotifications } from "lib";

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
}) {
    const { exophoneNumMenuOption, usersMenuOption } = props;

    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxField name="appName" label="Group Name" size="small" type="text" fullWidth rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <SelectField name="phoneNumber" label="Select Exotel Number" size="small" sx={{ width: '100%' }} menuOptions={exophoneNumMenuOption} rules={{ required: 'This field is required.' }} />
            </Grid>
            <Grid item md={12}>
                <AutocompleteField label="Select  Users in Group" name="users" options={usersMenuOption} placeholder="Select Employee" size="small" />
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
                        label="Webhook URL"
                        name="webHookUrl"
                        size="small"
                        type="text"
                        fullWidth readOnly
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                    <CustomIconButton onClick={onCopy} iconComponent={<ContentCopy />} tooltipProps={{ title: "Copy pop-up url", arrow: true }} />
                                </InputAdornment>
                            )
                        }}
                    />
                </FlexBox >
            }
        </>
    )
}

interface IKeyValue {
    key: string;
    value: string;
}

export interface IAddExophoneNumberFormProps {
    togglePopup: () => void;
    onSubmit: (formFields: IAddExophoneNumberFormFields) => void;
    isMutationLoading?: boolean;
    allUsersData: IUsers[];
    exophoneNumData: Exophone[];
}

export const AddExophoneNumberFormBase = (props: IAddExophoneNumberFormProps) => {
    const { togglePopup, isMutationLoading, allUsersData, exophoneNumData, onSubmit } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const webhookUrl = useAppSelector((state) => state.configurations.exotelWebhookNumberUrl);

    const exophoneNumMenuOption = exophoneNumData ? exophoneNumData.map((item) => ({ key: item.phone_number, value: item.phone_number })) : [];
    const usersMenuOption = allUsersData ? allUsersData.map((item) => ({ key: item.id.toString(), value: item.name })) : [];

    const form = useForm<IAddExophoneNumberFormFields>({
        mode: 'onChange'
    });

    React.useEffect(() => {
        if (webhookUrl) {
            form.setValue('webHookUrl', webhookUrl);
        }
    }, [form, webhookUrl]);

    const onSubmitForm = async (formValues: IAddExophoneNumberFormFields) => {
        console.log('formValues', formValues);
        const phone = exophoneNumData.find(item => item.phone_number === form.watch('phoneNumber'));
        onSubmit({
            appName: formValues.appName,
            friendlyName: phone?.friendly_name || '',
            phoneNumber: formValues.phoneNumber,
            sid: phone?.sid || '',
            users: formValues.users
        })
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSaveHandler = () => {
        togglePopup();
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <FormProvider {...form}>
            <FlexBox gap="20px">
                <ConfigSteps activeStep={activeStep} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0 ? <AddExophoneNumberForm exophoneNumMenuOption={exophoneNumMenuOption} usersMenuOption={usersMenuOption} /> : <AccountWebhookDetails isMutationLoading={isMutationLoading} />}
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
                    <Button variant="contained" onClick={isLastStep ? onSaveHandler : form.handleSubmit(onSubmitForm)}>
                        {isMutationLoading ? (
                            <CircularProgress size={20} />
                        ) : isLastStep ? 'Save' : 'Next'}
                    </Button>
                </FlexBox>
            </DialogActions>
        </FormProvider>
    )
}