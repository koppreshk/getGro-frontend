import * as React from 'react';
import { CancelButton, CustomSteps, FlexBox, LoadingButton } from 'lib/ui-ux';
import { ChooseConditionForm } from './choose-condition-form';
import { AssociateAgent } from './associate-agent';
import { Button } from '@mui/material';
import { KeyboardArrowLeft, Save, KeyboardArrowRight } from '@mui/icons-material';
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { FetchFieldsAndConditions, IAllAssignments } from 'modules/settings/apis/ticket-automation';
import { IAddRuleFormFields } from 'modules/settings/containers/ticket-automation';
import { useNotifications } from 'lib';
import { useTranslation } from 'react-i18next';

interface AddRuleProps {
    mode?: string;
    mutationLoading: boolean;
    defaultValues?: IAddRuleFormFields;
    data: FetchFieldsAndConditions[];
    allAssignments?: IAllAssignments[];
    onSubmit: (formData: IAddRuleFormFields) => Promise<void>;
}

const AddRuleBase = (props: AddRuleProps) => {
    const { onSubmit, allAssignments, mutationLoading } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const form = useFormContext<IAddRuleFormFields>();
    const navigate = useNavigate();
    const { showNotification } = useNotifications();
    const { t } = useTranslation();
    
    const renderBasedOnActiveStep = () => {
        switch (activeStep) {
            case 0:
                return <ChooseConditionForm data={props.data} allAssignments={allAssignments} mode={props.mode} ruleName={props.defaultValues?.ruleName} />;
            case 1:
                return <AssociateAgent />;
            default: return <></>
        }
    }

    const handleNext = async () => {
        const isFormValidated = await form.trigger();
        if (isFormValidated) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = [{ label: t('choose_condition') }, { label: t('associate_agent') }];

    const isLastStep = activeStep === steps.length - 1;
    const isInBetween = activeStep !== 0 || isLastStep;

    const onClose = () => navigate(-1);

    const onSave = (formData: IAddRuleFormFields) => {
        onSubmit(formData)
            .then(() => {
                onClose();
                showNotification({ message: `Successfully ${props.mode === 'edit' ? 'edited' : 'added'} the rules` })
            })
            .catch(() => showNotification({ message: `Failed to ${props.mode === 'edit' ? 'edit' : 'add'} the rule`, type: 'error' }));
    }

    return (
        <FlexBox width='100%' padding='20px' height='100%' flexDirection='column' alignItems='center'>
            <CustomSteps activeStep={activeStep} steps={steps} width='75%' />
            <div style={{ padding: '30px 60px', height: `calc(100% - 94px)`, width: '75%', boxSizing: 'border-box', overflow: 'auto' }}>
                {
                    renderBasedOnActiveStep()
                }
            </div>
            <FlexBox width='75%' justifyContent='space-between' padding='20px 0px 0px 0px'>
                {isLastStep || isInBetween
                    ?
                    <Button variant="contained" startIcon={<KeyboardArrowLeft />} onClick={isLastStep || isInBetween ? handleBack : onClose}>
                        {t('back')}
                    </Button>
                    : null}
                <FlexBox justifyContent="flex-end" width={isLastStep || isInBetween ? 'calc(100% - 95px)' : '100%'}>
                    <FlexBox gap='20px'>
                        <CancelButton onClick={onClose} />
                        {props.mode === 'edit' ?
                            <Button variant="outlined" size="large" type="button" onClick={() => form.reset()}>{t('reset')}</Button>
                            : null}
                        <LoadingButton
                            isLoading={mutationLoading}
                            variant="contained"
                            endIcon={isLastStep ? <Save /> : <KeyboardArrowRight />}
                            onClick={isLastStep ? form.handleSubmit(onSave) : handleNext}>
                            {isLastStep ? t('save') : t('next')}
                        </LoadingButton>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

export const AddRule = (props: AddRuleProps) => {
    const { defaultValues } = props;

    const form = useForm<IAddRuleFormFields>({
        defaultValues: defaultValues ?? {
            allTicketConditions: [{
                multiSelectConditionValue: [],
                ticketFields: '',
                operator: '',
                conditionValue: ''
            }],
            description: '',
            ruleName: '',
            anyTicketConditions: [],
            assignmentMode: 'even_distribution',
            selectedQueue: ''
        }
    });

    return (
        <FormProvider {...form}>
            <AddRuleBase {...props} />
        </FormProvider>
    )
}