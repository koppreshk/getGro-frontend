import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { PasswordField, TextboxField } from "lib/form-fields";
import { Box, Button, DialogActions, Divider, Grid, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { FlexBox, LoadingButton } from "lib/ui-ux";
import { IShopifyFormFields } from "modules/settings/containers/marketplace/shopify";

export interface IAddShopifyConfigurationFormProps {
    isMutationLoading: boolean;
    togglePopup: () => void;
    onSubmit: (formData: IShopifyFormFields) => void;
}

export const ShopifyStoreConfigForm = (props: IAddShopifyConfigurationFormProps) => {
    const { togglePopup, onSubmit, isMutationLoading } = props;
    const form = useFormContext<IShopifyFormFields>();
    const [activeStep,] = React.useState(0);
   
    const onSubmitForm =  React.useCallback(async (formField: IShopifyFormFields) => {
        onSubmit(formField)
    }, [onSubmit]) ;

    return (
        <>
            <FlexBox gap="20px">
                <ShopifyConfigSteps activeStep={activeStep} />
                <Divider orientation="vertical" variant="middle" flexItem />
                {activeStep === 0 ? <ShopifyDetailsForm /> : <span>Work in Progress..</span>}
            </FlexBox>
            <DialogActions sx={{ paddingTop: '30px' }}>
                <Button variant="outlined" onClick={togglePopup}>
                    Cancel
                </Button>
                <LoadingButton isLoading={isMutationLoading} variant="contained" autoFocus onClick={form.handleSubmit(onSubmitForm)}>
                    Save
                </LoadingButton>
            </DialogActions>
        </>
    )
}

const steps = [
    {
        label: 'Account',
        description: `Connect shopify store with getgro`,
    }
];

const ShopifyConfigSteps = (props: { activeStep: number }) => {
    const { activeStep } = props;
    return (
        <>
            <Box sx={{ width: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                        index === 2 ? (
                                            <Typography variant="caption">Last step</Typography>
                                        ) : null
                                    }
                                >
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    <Typography variant="body3">{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Stepper>
            </Box>
        </>
    )
}

const ShopifyEndURL = styled(Typography)`
    padding: 8px;
    background: ${({ theme }) => theme.pallete.grayVariant5};
    border-radius: 0px 4px 4px 0px;
`;

const StyledTextboxField = styled(TextboxField)`
    &&{
        .MuiOutlinedInput-root {
            padding: 0px;
        }
    }
`;

const ShopifyDetailsForm = () => {
    return (
        <Grid container spacing={3}>
            <Grid item md={12}>
                <TextboxField name="storeName" size="small" label="Store Name" sx={{ minWidth: '400px' }} rules={{ required: 'Store name required' }} />
            </Grid>
            <Grid item md={12}>
                <StyledTextboxField
                    name="storeUrl"
                    size="small" sx={{ pr: '0px !important' }} label="Store URL"
                    InputProps={{
                        endAdornment: <ShopifyEndURL variant="body3">.myshopify.com</ShopifyEndURL>
                    }}
                    autoComplete="off" rules={{ required: 'Store url required' }} />
            </Grid>
            <Grid item md={12}>
                <PasswordField name="accessToken" size="small" type="password" label="Access Token" rules={{ required: 'Access token required' }} />
            </Grid>
        </Grid>
    )
}

export const AddShopifyConfigurationFormBase = (props: IAddShopifyConfigurationFormProps) => {
    const form = useForm<IShopifyFormFields>({
        defaultValues: {
            storeName: '',
            storeUrl: '',
            accessToken: ''
        }
    });

    return (
        <FormProvider {...form}>
            <ShopifyStoreConfigForm {...props} />
        </FormProvider>
    )
}