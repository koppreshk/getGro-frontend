import React from "react";
import { Stepper, Box, Step, StepLabel, Typography, Button, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { AddReminder } from "./add-reminder";
import { AddEscalation } from "./add-escalation";
import { ChooseCondition } from "./choose-condition";
import { CancelButton, FlexBox, LoadingButton } from "lib/ui-ux";
import { KeyboardArrowLeft, KeyboardArrowRight, Save } from "@mui/icons-material";
import { SLATargets } from "./sla-targets";
import { IEscalationsNew, IKeyValue, ISLAmetaData } from "modules/settings/apis/ticket-automation/escalations";
import { useTranslation } from "react-i18next";


interface ITimeBasedFormFields {
    timePrefix: string,
    timeFields: string,
}

export interface ISLATargetsFormFields {
    [key: string]: {
        firstResponse: ITimeBasedFormFields,
        nextResponse: ITimeBasedFormFields,
        resolution: ITimeBasedFormFields
    }
}

export interface IEscalationFormFields {
    chooseCondition: {
        name: string;
        description: string;
        slaEvalutaion: string,
    }
    conditionsArray: {
        ticketFields: string,
        condition: string,
        conditionValue: string
    }[];
    slaTargets: ISLATargetsFormFields,
    addReminders: {
        ftrDuration: string;
        ftrGroup: IKeyValue[];
        ftrAgent: IKeyValue[];
        ntrDuration: string;
        ntrGroup: IKeyValue[];
        ntrAgent: IKeyValue[];
        resolutionDuration: string;
        resolutionGroup: IKeyValue[];
        resolutionAgent: IKeyValue[];
    },
    addEscalation: {
        ftrDuration: string;
        ftrGroup: IKeyValue[];
        ftrAgent: IKeyValue[];
        ntrDuration: string;
        ntrGroup: IKeyValue[];
        ntrAgent: IKeyValue[];
        resolutionDuration: string;
        resolutionGroup: IKeyValue[];
        resolutionAgent: IKeyValue[];
    }
}

interface IAddEscalationLayoutProps {
    data: ISLAmetaData;
    defaultvalues?: IEscalationFormFields;
    allEscalations?: IEscalationsNew[]
    mode?: 'add' | 'edit';
    mutationLoading: boolean
    onFormSubmit: (formData: IEscalationFormFields) => Promise<void>
}

export const AddEscalationLayout = React.memo((props: IAddEscalationLayoutProps) => {
    const { data, defaultvalues, allEscalations, mutationLoading, onFormSubmit } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const form = useForm<IEscalationFormFields>({
        defaultValues: defaultvalues ?? {
            chooseCondition: {
                name: '',
                description: '',
                slaEvalutaion: '0'
            },
            conditionsArray: [{
                ticketFields: data.ticket_fields[0].id.toString(),
                condition: 'is',
                conditionValue: '',
            }],
            slaTargets: {
                critical: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: '1'
                    }
                },
                high: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: '1'
                    }
                },
                normal: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: '1'
                    }
                },
                low: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: '1'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: '1'
                    }
                }
            },
            addReminders: {
                ftrAgent: [],
                ftrDuration: data.reminder_times[0].id.toString(),
                ftrGroup: [],
                ntrAgent: [],
                ntrDuration: data.reminder_times[0].id.toString(),
                ntrGroup: [],
                resolutionAgent: [],
                resolutionDuration: data.reminder_times[0].id.toString(),
                resolutionGroup: []
            },
            addEscalation: {
                ftrAgent: [],
                ftrDuration: data.escalation_types[0].id.toString(),
                ftrGroup: [],
                ntrAgent: [],
                ntrDuration: data.escalation_types[0].id.toString(),
                ntrGroup: [],
                resolutionAgent: [],
                resolutionDuration: data.escalation_types[0].id.toString(),
                resolutionGroup: []
            }
        },
        mode: 'onBlur'
    });

    const steps = [
        {
            label: t('choose_condition'),
        },
        {
            label: t('sla_targets'),
        },
        {
            label: t('add_reminders'),
        },
        {
            label: t('add_escalation'),
        }
    ];

    const handleNext = async () => {
        const isFormValidated = await form.trigger();
        if (isFormValidated) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const isLastStep = activeStep === steps.length - 1;
    const isInBetween = activeStep !== 0 || isLastStep;

    const onClose = () => navigate(-1);

    const renderBasedOnActiveStep = () => {
        switch (activeStep) {
            case 0:
                return <ChooseCondition ticketField={data.ticket_fields} priorities={data.priorities} allEscalations={allEscalations} mode={props.mode} slaName={defaultvalues?.chooseCondition.name} />;
            case 1:
                return <SLATargets timeOptions={data.run_types} slaTargetPriorities={data.priorities} />;
            case 2:
                return <AddReminder reminderTimes={data.reminder_times} queueList={data.queue_list} userList={data.user_list} />
            default: return <AddEscalation escalationTimes={data.escalation_types} queueList={data.queue_list} userList={data.user_list} />
        }
    }

    const onSave = (formData: IEscalationFormFields) => {
        onFormSubmit(formData).finally(() => onClose());
    }

    return (
        <Box sx={{ p: '20px 120px', height: '100%', boxSizing: 'border-box', width: '100%' }}>
            <FormProvider {...form}>
                <AddEscalaltionSteps activeStep={activeStep} steps={steps} />
                <div style={{ padding: '30px 60px', height: `calc(100% - 94px)`, boxSizing: 'border-box', overflow: 'auto' }}>
                    {
                        renderBasedOnActiveStep()
                    }
                </div>
                <DialogActions>
                    {isLastStep || isInBetween
                        ?
                        <Button variant="contained" startIcon={<KeyboardArrowLeft />} onClick={isLastStep || isInBetween ? handleBack : onClose}>
                            {t('back')}
                        </Button>
                        : null}
                    <FlexBox justifyContent="flex-end" width='calc(100% - 94px)'>
                        <FlexBox gap='20px'>
                            <CancelButton onClick={onClose} />
                            {props.mode === 'edit' ?
                                <Button variant="outlined" size="large" type="button" onClick={() => form.reset()}>{t(t('reset'))}</Button>
                                : null}
                            <LoadingButton
                                variant="contained"
                                isLoading={mutationLoading}
                                endIcon={isLastStep ? <Save /> : <KeyboardArrowRight />}
                                onClick={isLastStep ? form.handleSubmit(onSave) : handleNext}>
                                {isLastStep ? t('save') : t('next')}
                            </LoadingButton>
                        </FlexBox>
                    </FlexBox>
                </DialogActions>
            </FormProvider>
        </Box>
    )
})

const AddEscalaltionSteps = (props: {
    activeStep: number; steps: {
        label: string;
    }[]
}) => {
    const { activeStep, steps } = props;
    return (
        <>
            <Box>
                <Stepper activeStep={activeStep} orientation="horizontal">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 3 ? (
                                        <Typography variant="body3">Last step</Typography>
                                    ) : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    )
}
