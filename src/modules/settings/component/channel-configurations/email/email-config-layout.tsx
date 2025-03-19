import { ArrowBack } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  BreadCrumbs,
  CustomIconButton,
  FlexBox,
  MoreInformation,
} from 'lib/ui-ux';
import { FetchAllEmailsContainer } from 'modules/settings/containers/channel-configurations';
import {
  AddEmailConfigContainer,
  EditEmailConfigContainer,
} from 'modules/settings/containers/channel-configurations/email';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router-dom';

import GoogleSignInButton from './google-sigin-button';

const EmailConfigContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isBtnDisabled, setBtnStatus] = useState(false);
  // const toggleAddEscalationDrawer = useCallback(() => {
  //   navigate('add-email');
  // }, [navigate]);

  const toggleBtnStatus = useCallback((status: boolean) => {
    setBtnStatus(status);
  }, []);

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
          <GoogleSignInButton isDisabled={isBtnDisabled} />
          {/* <Button
            variant="contained"
            onClick={toggleAddEscalationDrawer}
            startIcon={<Add />}
          >
            {t('add_email')}
          </Button> */}
        </FlexBox>
      </FlexBox>
      <FetchAllEmailsContainer toggleBtnStatus={toggleBtnStatus} />
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
