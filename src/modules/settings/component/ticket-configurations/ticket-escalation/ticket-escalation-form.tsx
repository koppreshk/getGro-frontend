import React, { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { IEscalationMetadata } from "modules/settings/apis/escalations";
import { EscalationActionsForm } from "./escalation-actions-form";
import { EscalationConditionForm } from "./escalation-condition-form";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export interface TicketEscalationFormProps extends IEscalationMetadata {
    onFormSubmitHandler: (formData: ITicketEscalationFormFields) => void;
    defaultValues?: ITicketEscalationFormFields;
    mode: 'create' | 'edit'
}

export interface ITicketEscalationFormFields {
    name: string;
    after: string;
    conditions: string;
    alert: number;
    queues: string | number;
    statuses: string | number;
    subStatuses: string | number;
    customerClassification: string,
    designationType: string,
    lastConversationType: string,
    typeOfTicket: string,
    autoDispose: {
        escalateTo: string;
        dispostionType: string;
        priority: string;
    }
    internalSMSEscalation: {
        assignedTemplate: string;
        creatorTemplate: string;
        teamLeaderTemplate: string;
        managerTemplate: string;
    }
    internalEmailEscalation: {
        assignedTemplate: string;
        creatorTemplate: string;
        teamLeaderTemplate: string;
        managerTemplate: string;
    }
    internalWebNotification: {
        toAssignee: boolean;
        toCreator: boolean;
        toTeamLeader: boolean;
        toManager: boolean;
    }
    customerSMSEscalation: {
        customerTemplate: string;
    }
    customerEmailEscalation: {
        customerTemplate: string;
    }
    customSMSEscalation: {
        customPhone: string;
        customSMSTemplate: string;
    }
    customEmailEscalation: {
        customPhone: string;
        customEmailTemplate: string;
    }
}

const steps = [
    'Select Conditions for Escalation',
    'Set Actions for Escalation'
];

const formDefaultValues = {
    after: '',
    alert: 2,
    conditions: '',
    name: '',
    queues: '',
    statuses: '',
    subStatuses: '',
    customerClassification: '',
    designationType: '',
    lastConversationType: '',
    typeOfTicket: '',
    autoDispose: {
        dispostionType: '',
        escalateTo: '',
        priority: ''
    },
    customEmailEscalation: {
        customEmailTemplate: '',
        customPhone: ''
    },
    customerEmailEscalation: {
        customerTemplate: ''
    },
    customerSMSEscalation: {
        customerTemplate: ''
    },
    customSMSEscalation: {
        customPhone: '',
        customSMSTemplate: ''
    },
    internalEmailEscalation: {
        assignedTemplate: '',
        creatorTemplate: '',
        managerTemplate: '',
        teamLeaderTemplate: ''
    },
    internalSMSEscalation: {
        assignedTemplate: '',
        creatorTemplate: '',
        managerTemplate: '',
        teamLeaderTemplate: ''
    },
    internalWebNotification: {
        toAssignee: false,
        toCreator: false,
        toManager: false,
        toTeamLeader: false
    }
}

export const TicketEscalationForm = (props: TicketEscalationFormProps) => {
    const { onFormSubmitHandler, mode, defaultValues, ...rest } = props;
    const isInEditMode = useMemo(() => mode === 'edit', [mode]);
    const [activeStep, setActiveStep] = React.useState(0);

    const form = useForm<ITicketEscalationFormFields>({
        defaultValues: defaultValues ?? formDefaultValues,
        mode: 'onBlur'
    });

    const onSubmit = React.useCallback(async (formvalues: ITicketEscalationFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler]);

    const handleNext = useCallback(async () => {
        const isFormValidated = await form.trigger();
        if (isFormValidated) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [form]);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <FormProvider {...form}>
            <FlexBox padding="20px" gap="10px" height="calc(100% - 77px)" flexDirection="column">
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div style={{ height: 'calc(100% - 140px)' }}>
                    {activeStep === 0 ? <EscalationConditionForm {...rest} /> : <EscalationActionsForm escalate_to={rest.escalate_to} priorities={rest.priorities} sub_statuses={rest.sub_statuses} />}
                </div>
                <FlexBox gap='10px' width="100%" justifyContent={isInEditMode ? "space-between" : 'flex-end'}>
                    {isInEditMode ? <Button variant="outlined" size="large" type="button" onClick={() => form.reset()}>{'Reset'}</Button> : null}
                    <FlexBox gap='10px' >
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            startIcon={<KeyboardArrowLeft />}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            endIcon={activeStep !== steps.length - 1 ? <KeyboardArrowRight /> : undefined}
                            onClick={() => activeStep === steps.length - 1 ? form.handleSubmit(onSubmit)() : handleNext()}>
                            {activeStep === steps.length - 1 ? isInEditMode ? 'Update Escalation' : 'Add Escalation' : 'Next'}
                        </Button>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}
