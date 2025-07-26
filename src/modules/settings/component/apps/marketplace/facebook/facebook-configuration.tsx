/* eslint-disable @typescript-eslint/no-explicit-any */
import { Login } from '@mui/icons-material';
import { LoadingButton } from 'lib/ui-ux';
import { useFacebookConfiguration } from 'modules/settings/apis/marketplace/facebook';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FacebookResponse {
  authResponse: {
    userID: string | null;
    expiresIn: string | null;
    code: string;
  };
  status: string;
}

// Define Facebook SDK types for TypeScript
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export const FacebookConfiguration = (props: {
  updateInstallation: () => void;
  mode?: string;
}) => {
  const { mode = 'authenticate' } = props;
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useFacebookConfiguration();

  const [fbSdkReady, setFbSdkReady] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v21.0',
      });
      window.FB.AppEvents.logPageView();
      setFbSdkReady(true); // Mark SDK as ready here
    };

    // Dynamically load FB SDK script only once
    if (!document.getElementById('facebook-jssdk')) {
      const fjs = document.getElementsByTagName('script')[0];
      const js: any = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    }
  }, []);

  const handleFBLogin = () => {
    if (!fbSdkReady) {
      console.warn('Facebook SDK is not initialized yet.');
      return; // Prevent calling FB.login before init
    }

    window.FB.login(
      (response: FacebookResponse) => {
        if (response.authResponse) {
          mutateAsync({ code: response.authResponse.code }).then(() => {
            props.updateInstallation();
          });
        } else {
          console.error('User cancelled login or did not fully authorize.');
        }
      },
      {
        config_id: import.meta.env.VITE_FB_CONFIG_ID,
        response_type: 'code',
        override_default_response_type: true,
        redirect_uri: `${import.meta.env.VITE_SUB_DOMAIN}configurations/marketplace/facebook`,
      }
    );
  };

  return (
    <LoadingButton
      variant="contained"
      size="medium"
      isLoading={isLoading}
      onClick={handleFBLogin}
      endIcon={<Login />}
      disabled={!fbSdkReady} // disable until SDK is ready
    >
      {mode === 'authenticate' ? t('authenticate') : t('re_authenticate')}
    </LoadingButton>
  );
};
