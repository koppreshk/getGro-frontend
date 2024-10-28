import { Box, Stepper, Step, StepLabel, StepContent, Typography } from "@mui/material";

interface ConfigStepperProps {
    activeStep: number, steps: {
        label: string;
        description?: string;
    }[]
}

export const ConfigStepper = (props: ConfigStepperProps) => {
    const { activeStep, steps } = props;

    return (
        <Box>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>
                            {step.label}
                        </StepLabel>
                        {step.description
                            ? <StepContent>
                                <Typography variant="body3">{step.description}</Typography>
                            </StepContent> : null}
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}