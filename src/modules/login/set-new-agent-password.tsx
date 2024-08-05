import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useNotifications } from "lib";
import { useUpdatePassword } from "./apis";
import { TextboxField } from "lib/form-fields";
import LoginImage from '../../assets/png/getgro-login-illus.png';
import GetGroLogoImg from '../../assets/png/getGroLogoWname.png';

interface ISetNewPwdFormFields {
    newPassword: string;
    confirmNewPassword: string;
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

const SetNewAgentPasswordForm = () => {
    const { handleSubmit, watch } = useFormContext<ISetNewPwdFormFields>();
    const { mutateAsync } = useUpdatePassword();
    const { showNotification } = useNotifications();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const onSignIn = useCallback((data: ISetNewPwdFormFields) => {
        mutateAsync({ password: data.newPassword, token: searchParams.get('token')! })
            .then(() => {
                showNotification({ message: 'Successfully updated password, please login to continue', type: 'success' })
                navigate('/login');
            }).catch((err) => {
                console.error(err);
                showNotification({ message: 'Failed to update password, please try later', type: 'error' })
            })
    }, [mutateAsync, navigate, searchParams, showNotification]);

    const validatePassword = (val: string) => {
        if (val !== watch('newPassword')) {
            return 'Passwords do not match'
        }
    }

    return (
        <Box sx={{ width: '100%', padding: '50px', boxSizing: 'border-box' }}>
            <form>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <FlexBox gap="10px">
                            <Typography variant="h3" fontWeight='500'>Welcome</Typography>
                            <Typography variant="h3" fontWeight='500' color='#6969ff'>user!</Typography>
                        </FlexBox>
                        <Typography variant="subtitle2" color='#667287'>Set a new password to continue</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="newPassword" label="New Password" type="password" fullWidth rules={{ required: 'Password is required' }} />
                    </Grid>
                    <Grid item md={12}>
                        <TextboxField name="confirmNewPassword" label="Confirm New Password" type="text" fullWidth rules={{ required: 'Password is required', validate: validatePassword }} />
                    </Grid>
                    <Grid item md={12}>
                        <Button
                            onClick={handleSubmit(onSignIn)} variant="contained" fullWidth size="large" type="submit"
                        // disabled={isLoading}
                        // endIcon={isLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : <ArrowForwardRounded />}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

const SetNewAgentPassword = React.memo(() => {
    const formValues = useForm<ISetNewPwdFormFields>({
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        mode: 'onBlur'
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
                    <SetNewAgentPasswordForm />
                </FormProvider>
            </LoginSectionRight>
        </FlexBox>
    )
})

export default SetNewAgentPassword