import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { IEscalationMetadata } from "modules/settings/apis/escalations";
import { EscalationActionsForm } from "./escalation-actions-form";
import { EscalationConditionForm } from "./escalation-condition-form";
import { KeyboardArrowLeft } from "@mui/icons-material";

export interface TicketEscalationFormProps extends Pick<IEscalationMetadata, 'after' | 'conditions' | 'queues' | 'statuses'> {
    subStatuses: string[];
    onFormSubmitHandler: (formData: ITicketEscalationFormFields) => void;
    defaultValues?: ITicketEscalationFormFields;
    mode: 'create' | 'edit'
}

export interface ITicketEscalationFormFields {
    name: string;
    after: string;
    conditions: string;
    alert: number;
    queues: string;
    statuses: string;
    subStatuses: string;
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
        defaultValues: defaultValues ?? formDefaultValues
    });

    const onSubmit = React.useCallback(async (formvalues: ITicketEscalationFormFields) => {
        onFormSubmitHandler(formvalues);
    }, [onFormSubmitHandler]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

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
                    {activeStep === 0 ? <EscalationConditionForm {...rest} /> : <EscalationActionsForm />}
                </div>
                <FlexBox gap='10px' width="100%" justifyContent="flex-end">
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        startIcon={<KeyboardArrowLeft />}
                        sx={{ mr: 1 }}>
                        Back
                    </Button>
                    {isInEditMode ? <Button variant="text" color="inherit" size="large" type="button" onClick={() => form.reset()}>{'Reset'}</Button> : null}
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                        onClick={() => activeStep === steps.length - 1 ? form.handleSubmit(onSubmit) : handleNext()}>
                        {activeStep === steps.length - 1 ? isInEditMode ? 'Edit Escalaltion' : 'Add Escalation' : 'Next'}
                    </Button>
                </FlexBox>
            </FlexBox>
        </FormProvider>
    )
}
