import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";

interface CustomStepsProps {
    activeStep: number;
    steps: {
        label: string;
    }[];
    width?: string;
}

export const CustomSteps = (props: CustomStepsProps) => {
    const { activeStep, steps, width = "100%" } = props;
    return (
        <>
            <Box width={width}>
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