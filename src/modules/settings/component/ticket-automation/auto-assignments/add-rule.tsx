import * as React from 'react';
import { CustomSteps, FlexBox } from 'lib/ui-ux';
import { ChooseConditionForm } from './choose-condition-form';
import { AssociateAgent } from './associate-agent';
import { Button } from '@mui/material';
import { KeyboardArrowLeft, Save, KeyboardArrowRight } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FetchFieldsAndConditions } from 'modules/settings/apis/ticket-automation';

interface AddRuleProps {
    mode?: string;
    data: FetchFieldsAndConditions[]
}

export const AddRule = (props: AddRuleProps) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const form = useFormContext();
    const navigate = useNavigate();

    const renderBasedOnActiveStep = () => {
        switch (activeStep) {
            case 0:
                return <ChooseConditionForm data={props.data} />;
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
    const steps = [{ label: "Choose Condition" }, { label: "Associate Agent" }];

    const isLastStep = activeStep === steps.length - 1;
    const isInBetween = activeStep !== 0 || isLastStep;

    const onSave = () => { }
    const onClose = () => navigate(-1);

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
                        Back
                    </Button>
                    : null}
                <FlexBox justifyContent="flex-end" width={isLastStep || isInBetween ? 'calc(100% - 95px)' : '100%'}>
                    <FlexBox gap='20px'>
                        <Button variant="contained" color="error" onClick={onClose}>
                            {'Cancel'}
                        </Button>
                        {props.mode === 'edit' ?
                            <Button variant="outlined" size="large" type="button" onClick={() => form.reset()}>{'Reset'}</Button>
                            : null}
                        <Button
                            variant="contained"
                            endIcon={isLastStep ? <Save /> : <KeyboardArrowRight />}
                            onClick={isLastStep ? form.handleSubmit(onSave) : handleNext}>
                            {isLastStep ? 'Save' : 'Next'}
                        </Button>
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}