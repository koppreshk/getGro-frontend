import { Add, ArrowBack } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useNotifications } from 'lib';
import {
  BreadCrumbs,
  CustomIconButton,
  FlexBox,
  MoreInformation,
} from 'lib/ui-ux';
import { useNylasGoogleOAuth } from 'modules/settings/apis';
import { FetchAllEmailsContainer } from 'modules/settings/containers/channel-configurations';
import {
  AddEmailConfigContainer,
  EditEmailConfigContainer,
} from 'modules/settings/containers/channel-configurations/email';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router-dom';

const EmailConfigContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { mutateAsync } = useNylasGoogleOAuth();

  const toggleAddEscalationDrawer = useCallback(() => {
    navigate('add-email');
  }, [navigate]);

  const login = useGoogleLogin({
    flow: 'auth-code', // Use Authorization Code Flow
    onSuccess: (response) => {
      console.log('response', response);
      mutateAsync({ code: response.code })
        .then((res) => {
          if (res.status) {
            showNotification({
              message: t('google_login_success'),
              type: 'success',
            });
            return;
          }
          showNotification({ message: res.message, type: 'error' });
        })
        .catch(() => {
          showNotification({
            message: t('google_login_failure'),
            type: 'error',
          });
        });
      // Send this code to your backend to exchange for tokens
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <>
      <FlexBox
        width="100%"
        justifyContent="space-between"
        padding="10px"
        alignItems="center"
      >
        <FlexBox alignItems="center" gap="10px">
          <CustomIconButton
            onClick={() => {
              navigate('/configurations');
            }}
            iconComponent={<ArrowBack />}
            tooltipProps={{ title: t('back') }}
          />
          <Typography variant="h5">{t('email_configurations')}</Typography>
        </FlexBox>
        <FlexBox gap={'10px'}>
          <Button variant="contained" onClick={login} startIcon={<Add />}>
            {'Google Login'}
          </Button>
          <Button
            variant="contained"
            onClick={toggleAddEscalationDrawer}
            startIcon={<Add />}
          >
            {t('add_email')}
          </Button>
        </FlexBox>
      </FlexBox>
      <FetchAllEmailsContainer />
    </>
  );
};

export default function EmailConfigLayout() {
  const { t } = useTranslation();

  return (
    <FlexBox
      width="100%"
      height="100%"
      flexDirection="column"
      padding="20px"
      gap={'10px'}
    >
      <BreadCrumbs />
      <MoreInformation information={t('email_more_info')} />
      <div style={{ height: 'calc(100% - 34px)' }}>
        <Routes>
          <Route
            key="base-route"
            path="/"
            element={
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
              >
                <EmailConfigContent />{' '}
              </GoogleOAuthProvider>
            }
          />
          <Route
            key="add-email-route"
            path="/add-email"
            element={<AddEmailConfigContainer />}
          />
          <Route
            key="edit-email-route"
            path="/edit-email"
            element={<EditEmailConfigContainer />}
          />
        </Routes>
      </div>
    </FlexBox>
  );
}
