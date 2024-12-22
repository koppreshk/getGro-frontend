import { CheckCircle, Close } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { TextboxField } from 'lib/form-fields';
import { FlexBox, LoadingButton } from 'lib/ui-ux';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useForgotPassword } from './apis/forgot-password';

interface IForgotPswdFields {
  email: string;
}

export const ForgotPassword = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useForgotPassword();

  const formMethods = useForm<IForgotPswdFields>({
    defaultValues: {
      email: '',
    },
  });

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = () => {
    mutateAsync({
      email: formMethods.watch('email'),
    })
      .then((res) => {
        if (res.status) {
          setIsSubmit((pre) => !pre);
          return;
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <FormProvider {...formMethods}>
      <Link
        variant="subtitle2"
        underline="none"
        sx={{ fontSize: '16px', cursor: 'pointer' }}
        onClick={handleClick}
      >
        {t('forgot_password')}
      </Link>

      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: '16px' }}>
          {t('forgot_password')}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          {!isSubmit ? (
            <>
              <Typography variant="body2">
                {t('forgot_password_description')}
              </Typography>
              <FlexBox width="100%" flexDirection="column" gap={'20px'}>
                <TextboxField
                  name="email"
                  sx={{ mt: '20px' }}
                  label={t('email')}
                  fullWidth
                  rules={{
                    required: t('email_is_required'),
                  }}
                />
                <LoadingButton
                  isLoading={isLoading}
                  onClick={formMethods.handleSubmit(onSubmit)}
                  variant="contained"
                  fullWidth
                >
                  {t('submit')}
                </LoadingButton>
              </FlexBox>
            </>
          ) : (
            <FlexBox
              width="100%"
              flexDirection="column"
              gap={'20px'}
              alignItems="center"
            >
              <FlexBox width="100%" justifyContent="center">
                <CheckCircle fontSize="large" color="success" />
              </FlexBox>
              <Typography variant="h3">
                {t('password_reset_email_message')}
              </Typography>
              <Typography variant="body2">
                An email has been sent to your registered email address.
              </Typography>

              <Typography variant="body2">
                Follow the instructions in the email to reset your password.
              </Typography>
              <Typography variant="body2">
                If you haven't received the email,{' '}
                <Link onClick={onSubmit} sx={{ cursor: 'pointer' }}>
                  Click here
                </Link>{' '}
                to resend it.
              </Typography>
            </FlexBox>
          )}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};
