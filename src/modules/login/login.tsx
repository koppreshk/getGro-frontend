import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, CircularProgress, FormControlLabel, Grid, Link, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import React, { useCallback } from "react";
import styled from "styled-components";
import { useAuth } from "./hooks/use-auth";
import { TextboxField } from "lib/form-fields";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import LoginImage from '../../assets/png/getgro-login-illus.png';
import GetGroLogoImg from '../../assets/png/getGroLogoWname.png';
import { CheckboxField } from "lib/form-fields/checkbox-field";
import { useNotifications } from "lib";
import { LoginResult, useLoginUser } from "./apis";
import { Roles } from "lib/hooks";

interface ILoginFields {
    email: string;
    rememberMe: boolean;
    password: string;
}

const LoginSectionLeft = styled(FlexBox)`
    background-color: ${({ theme }) => theme.pallete.purpleLight};
`;

const LoginSectionRight = styled(FlexBox)`
    
`;

const GetGroLogoWrapper = styled(FlexBox)`
    padding-top: 32px;
`;

const IllustrationImg = styled.img`
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;

const LoginForm = () => {
    const { login } = useAuth();
    const { handleSubmit } = useFormContext<ILoginFields>();
    const { showNotification } = useNotifications();
    const { isLoading, mutateAsync } = useLoginUser();

    const onSignIn = useCallback((data: ILoginFields) => {
        mutateAsync({ email: data.email, password: data.password })
            .then((res: LoginResult) => {
                login({ authToken: res.authToken, email: data.email, rememberMe: data.rememberMe, role: res.role as Roles });
            }).catch((err) => {
                console.error(err);
                showNotification({ message: 'Failed to login, please check email or password', type: 'error' })
            })
    }, [login, mutateAsync, showNotification]);

    return (
        <Box sx={{ width: '100%', padding: '50px', boxSizing: 'border-box' }}>
            <form>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <FlexBox gap="10px">
                            <Typography variant="h3" fontWeight='500'>Welcome</Typography>
                            <Typography variant="h3" fontWeight='500' color='#6969ff'>back!</Typography>
                        </FlexBox>
                        <Typography variant="subtitle2" color='#667287'>Login to continue</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="email" label="Email" type="text" fullWidth rules={{ required: 'Email input required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="password" label="Password" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <Button onClick={handleSubmit(onSignIn)} variant="contained" fullWidth size="large" type="submit" disabled={isLoading} endIcon={isLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : <ArrowForwardRounded />}>Sign in</Button>
                    </Grid>
                </Grid>
                <Grid item md={12} marginTop='20px'>
                    <FlexBox justifyContent="space-between" alignItems="center">
                        <FormControlLabel
                            value="end"
                            control={<CheckboxField name="rememberMe" />}
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

const Login = React.memo(() => {
    const formValues = useForm<ILoginFields>({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });
    return (
        <FlexBox height="100%" width="100%">

            <LoginSectionLeft width="70%" alignItems="center">
                <IllustrationImg src={LoginImage} alt="" />
            </LoginSectionLeft>

            <LoginSectionRight width="30%" flexDirection="column" alignItems="center">
                <GetGroLogoWrapper width="100%" justifyContent="center">
                    <img src={GetGroLogoImg} width='50%' />
                </GetGroLogoWrapper>
                <FormProvider {...formValues}>
                    <LoginForm />
                </FormProvider>
            </LoginSectionRight>

        </FlexBox>
    )
})

export default Login