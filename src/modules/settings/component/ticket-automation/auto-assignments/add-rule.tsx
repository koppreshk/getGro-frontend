import * as React from 'react';
import Box from '@mui/material/Box';
import { CustomSteps, FlexBox } from 'lib/ui-ux';
import { ChooseConditionForm } from './choose-condition-form';
import { AssociateAgent } from './associate-agent';
import { Button, DialogActions } from '@mui/material';
import { KeyboardArrowLeft, Save, KeyboardArrowRight } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface AddRuleProps {
    mode?: string;
}

export const AddRule = (props: AddRuleProps) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const form = useFormContext();
    const navigate = useNavigate();

    const renderBasedOnActiveStep = () => {
        switch (activeStep) {
            case 0:
                return <ChooseConditionForm />;
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
        <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box', height: '100%' }}>
            <CustomSteps activeStep={activeStep} steps={steps} width='60%'/>
            <div style={{ padding: '30px 60px', height: `calc(100% - 94px)`, boxSizing: 'border-box', overflow: 'auto' }}>
                {
                    renderBasedOnActiveStep()
                }
            </div>
            <DialogActions>
                {isLastStep || isInBetween
                    ?
                    <Button variant="contained" startIcon={<KeyboardArrowLeft />} onClick={isLastStep || isInBetween ? handleBack : onClose}>
                        Back
                    </Button>
                    : null}
                <FlexBox justifyContent="flex-end" width='calc(100% - 94px)'>
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
            </DialogActions>
        </Box>
    )
}