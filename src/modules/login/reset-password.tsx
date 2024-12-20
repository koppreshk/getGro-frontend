import { ArrowForwardRounded } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { useNotifications } from 'lib';
import { PasswordField, TextboxField } from 'lib/form-fields';
import { FlexBox, LoadingButton } from 'lib/ui-ux';
import React, { useCallback } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useResetPassword } from './apis';
import {
  LoginSectionLeft,
  IllustrationImg,
  LoginSectionRight,
  GetGroLogoWrapper,
} from './login';
import LoginImage from '../../assets/png/getgro-login-illus.png';
import GetGroLogoImg from '../../assets/svg/main.svg';

interface ISetNewPwdFormFields {
  newPassword: string;
  confirmNewPassword: string;
}

const ResetPasswordForm = () => {
  const { watch, handleSubmit } = useFormContext<ISetNewPwdFormFields>();
  const { mutateAsync, isLoading } = useResetPassword();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const onSignIn = useCallback(
    (data: ISetNewPwdFormFields) => {
      if (token && email) {
        mutateAsync({
          password: data.newPassword,
          token,
          email,
        })
          .then((res) => {
            if (res.status) {
              showNotification({
                message:
                  'Successfully updated password, please login to continue',
                type: 'success',
              });
              navigate('/login');
              return;
            }
            return showNotification({ message: res.message, type: 'error' });
          })
          .catch((err) => {
            console.error(err);
            showNotification({
              message: 'Failed to update password, please try later',
              type: 'error',
            });
          });
      }
    },
    [email, mutateAsync, navigate, showNotification, token]
  );

  const validatePassword = (val: string) => {
    if (val !== watch('newPassword')) {
      return 'Passwords do not match';
    }
  };

  return (
    <Box sx={{ width: '100%', padding: '50px', boxSizing: 'border-box' }}>
      <form>
        <Grid container spacing={4}>
          <Grid item md={12}>
            <FlexBox gap="10px">
              <Typography variant="h3" fontWeight="500">
                Welcome back
              </Typography>
              <Typography variant="h3" fontWeight="500" color="#6969ff">
                user!
              </Typography>
            </FlexBox>
            <Typography variant="subtitle2" color="#667287">
              Set a new password to continue
            </Typography>
          </Grid>
          <Grid item md={12}>
            <PasswordField
              name="newPassword"
              label={t('new_password')}
              type="password"
              fullWidth
              rules={{ required: 'Password is required' }}
            />
          </Grid>
          <Grid item md={12}>
            <TextboxField
              name="confirmNewPassword"
              label={t('confirm_new_password')}
              type="text"
              fullWidth
              rules={{
                required: 'Password is required',
                validate: validatePassword,
              }}
            />
          </Grid>
          <Grid item md={12}>
            <LoadingButton
              isLoading={isLoading}
              disabled={token === null || email === null}
              onClick={handleSubmit(onSignIn)}
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              endIcon={<ArrowForwardRounded />}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const ResetPassword = React.memo(() => {
  const formValues = useForm<ISetNewPwdFormFields>({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onBlur',
  });
  return (
    <FlexBox height="100%" width="100%">
      <LoginSectionLeft width="70%" alignItems="center">
        <IllustrationImg src={LoginImage} alt="" />
      </LoginSectionLeft>
      <LoginSectionRight width="30%" flexDirection="column" alignItems="center">
        <GetGroLogoWrapper width="100%" justifyContent="center">
          <img src={GetGroLogoImg} width="50%" />
        </GetGroLogoWrapper>
        <FormProvider {...formValues}>
          <ResetPasswordForm />
        </FormProvider>
      </LoginSectionRight>
    </FlexBox>
  );
});

export default ResetPassword;
