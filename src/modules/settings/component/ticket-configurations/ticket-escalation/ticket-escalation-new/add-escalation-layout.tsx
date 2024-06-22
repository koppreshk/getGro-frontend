import React from "react";
import { Stepper, Box, Step, StepLabel, Typography, Button, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { AddReminder } from "./add-reminder";
import { AddEscalation } from "./add-escalation";
import { ChooseCondition } from "./choose-condition";
import { FlexBox } from "lib/ui-ux";
import { KeyboardArrowLeft, KeyboardArrowRight, Save } from "@mui/icons-material";
import { SLATargets } from "./sla-targets";
import { IKeyValue, ISLAmetaData, useCreateEscalationNew } from "modules/settings/apis/escalations";

const steps = [
    {
        label: 'Choose Condition',
    },
    {
        label: 'SLA Targets',
    },
    {
        label: 'Add Reminders',
    },
    {
        label: 'Add Escalation',
    }
];

interface ITimeBasedFormFields {
    timePrefix: string,
    timeFields: string,
}

interface IEscalationFormFields {
    chooseCondition: {
        name: string;
        description: string;
        slaEvalutaion: string,
        ticketFields: string,
        condition: string,
        conditionValue: string
    }
    slaTargets: {
        [key: string]: {
            firstResponse: ITimeBasedFormFields,
            nextResponse: ITimeBasedFormFields,
            resolution: ITimeBasedFormFields
        }
    },
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
    mode?: 'add' | 'edit';
}

export const AddEscalationLayout = (props: IAddEscalationLayoutProps) => {
    const { data, defaultvalues, mode = 'add' } = props;
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const form = useForm<IEscalationFormFields>({
        defaultValues: defaultvalues ?? {
            chooseCondition: {
                name: '',
                description: '',
                slaEvalutaion: '0',
                ticketFields: data.ticket_fields[0].id.toString(),
                condition: 'is',
                conditionValue: ''
            },
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
            }
        }
    });

    const { mutateAsync } = useCreateEscalationNew();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                return <ChooseCondition ticketField={data.ticket_fields} />;
            case 1:
                return <SLATargets timeOptions={data.run_types} slaTargetPriorities={data.priorities} />;
            case 2:
                return <AddReminder reminderTimes={data.reminder_times} queueList={data.queue_list} userList={data.user_list} />
            default: return <AddEscalation escalationTimes={data.escalation_types} queueList={data.queue_list} userList={data.user_list} />
        }
    }

    const onSave = async (formData: IEscalationFormFields) => {
        const { addEscalation, addReminders, chooseCondition, slaTargets } = formData;
        onClose();
        mutateAsync({
            name: chooseCondition.name,
            description: chooseCondition.description,
            evaluation_type: chooseCondition.slaEvalutaion,
            ticket_fields: [
                { id: chooseCondition.ticketFields, value: chooseCondition.conditionValue },
            ],
            targets: data.priorities.map((item) => (
                {
                    priority_id: item.id,
                    time_to_first_response: slaTargets[item.name.toLocaleLowerCase()].firstResponse.timePrefix,
                    time_to_next_response: slaTargets[item.name.toLocaleLowerCase()].nextResponse.timePrefix,
                    time_to_resolution: slaTargets[item.name.toLocaleLowerCase()].nextResponse.timePrefix,
                    first_response_run_type_id: slaTargets[item.name.toLocaleLowerCase()].firstResponse.timeFields,
                    next_response_run_type_id: slaTargets[item.name.toLocaleLowerCase()].nextResponse.timeFields,
                    resolution_run_type_id: slaTargets[item.name.toLocaleLowerCase()].resolution.timeFields
                }
            )),
            reminder: {
                fr_reminder_id: addReminders.ftrDuration,
                nr_reminder_id: addReminders.ntrDuration,
                rs_reminder_id: addReminders.resolutionDuration,
                queue_ids: addReminders.ftrGroup.map((item) => item.key),
                user_ids: addReminders.ftrAgent.map((item) => item.key)
            },
            escalations: {
                fr_escalation_id: addEscalation.ftrDuration,
                nr_escalation_id: addEscalation.ntrDuration,
                rs_escalation_id: addEscalation.resolutionDuration,
                queue_ids: addEscalation.ftrGroup.map((item) => item.key),
                user_ids: addEscalation.ftrAgent.map((item) => item.key)
            }
        })
    }

    return (
        <Box sx={{ p: '20px 120px', height: '100%', boxSizing: 'border-box' }}>
            <FormProvider {...form}>
                <AddEscalaltionSteps activeStep={activeStep} />
                <div style={{ padding: '30px 60px', height: `calc(100% - 94px)`, boxSizing: 'border-box', overflow: 'auto' }}>
                    {
                        renderBasedOnActiveStep()
                    }
                </div>
                <DialogActions>
                    {isLastStep || isInBetween
                        ?
                        <Button variant="outlined" startIcon={<KeyboardArrowLeft />} onClick={isLastStep || isInBetween ? handleBack : onClose}>
                            Back
                        </Button>
                        : null}
                    <FlexBox justifyContent="flex-end" width='calc(100% - 94px)'>
                        <FlexBox gap='20px'>
                            <Button variant="outlined" onClick={onClose}>
                                {'Cancel'}
                            </Button>
                            <Button
                                disabled={isLastStep && mode === 'edit'}
                                variant="contained"
                                endIcon={isLastStep ? <Save /> : <KeyboardArrowRight />}
                                onClick={isLastStep ? form.handleSubmit(onSave) : handleNext}>
                                {isLastStep ? 'Save' : 'Next'}
                            </Button>
                        </FlexBox>
                    </FlexBox>
                </DialogActions>
            </FormProvider>
        </Box>
    )
}

const AddEscalaltionSteps = (props: { activeStep: number }) => {
    const { activeStep } = props;
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
