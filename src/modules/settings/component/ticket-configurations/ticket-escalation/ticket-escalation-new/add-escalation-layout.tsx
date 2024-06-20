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
import { ISLAmetaData } from "modules/settings/apis/escalations";

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
    timeFields: string
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
        critical: {
            firstResponse: ITimeBasedFormFields,
            nextResponse: ITimeBasedFormFields,
            resolution: ITimeBasedFormFields
        }
        high: {
            firstResponse: ITimeBasedFormFields,
            nextResponse: ITimeBasedFormFields,
            resolution: ITimeBasedFormFields
        }
        normal: {
            firstResponse: ITimeBasedFormFields,
            nextResponse: ITimeBasedFormFields,
            resolution: ITimeBasedFormFields
        }
        low: {
            firstResponse: ITimeBasedFormFields,
            nextResponse: ITimeBasedFormFields,
            resolution: ITimeBasedFormFields
        }
    }
}

interface IAddEscalationLayoutProps {
    data: ISLAmetaData;
}

export const AddEscalationLayout = (props: IAddEscalationLayoutProps) => {
    const { data } = props;
    console.log("SLA Data", data);
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate();
    const form = useForm<IEscalationFormFields>({
        defaultValues: {
            chooseCondition: {
                name: '',
                description: '',
                slaEvalutaion: 'ticket-creation-time',
                ticketFields: 'source',
                condition: 'is',
                conditionValue: 'open'
            },
            slaTargets: {
                critical: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    }
                },
                high: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    }
                },
                normal: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    }
                },
                low: {
                    firstResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    nextResponse: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    },
                    resolution: {
                        timePrefix: '1',
                        timeFields: 'minutes'
                    }
                }
            }
        }
    });

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
                return <ChooseCondition />;
            case 1:
                return <SLATargets />;
            case 2:
                return <AddReminder />
            default: return <AddEscalation />
        }
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
                            <Button variant="contained" endIcon={isLastStep ? <Save /> : <KeyboardArrowRight />} onClick={isLastStep ? onClose : handleNext}>
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
