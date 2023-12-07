import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useAuth } from "./hooks/use-auth";
import { TextboxField } from "lib/form-fields";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const LoginWrapper = styled(FlexBox)`
    
`;

interface ILoginFields {
    email: string;
    password: string;
}
const LoginForm = () => {
    const { login } = useAuth();
    const { handleSubmit } = useFormContext<ILoginFields>();

    const onSignIn = useCallback((data: ILoginFields) => {
        login({ password: data.password, userName: data.email })
    }, [login]);

    return (
        <Box sx={{ width: '100%', padding: '50px', boxSizing: 'border-box' }}>
            <form>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}>Login</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="email" label="Username / Email" type="text" fullWidth rules={{ required: 'Email input required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="password" label="Password" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={handleSubmit(onSignIn)} variant="contained" fullWidth size="large" endIcon={<ArrowForwardRounded />}>Sign in</Button>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <FlexBox $justifyContent="space-between" $alignItems="center">
                        <FormControlLabel
                            value="end"
                            control={<Checkbox />}
                            label="Remember me"
                            labelPlacement="end"
                        />
                        <Link href="#" variant="subtitle2" underline="none" sx={{ fontSize: '16px' }}>Forgot password?</Link>
                    </FlexBox>

                </Grid>
            </form>
        </Box>
    )
}

export const Login = React.memo(() => {
    const formValues = useForm();
    return (
        <LoginWrapper $height="100%" $width="100%">
            <FlexBox $width="60%">

            </FlexBox>
            <FlexBox $width="40%">
                <FormProvider {...formValues}>
                    <LoginForm />
                </FormProvider>
            </FlexBox>
        </LoginWrapper>
    )
})