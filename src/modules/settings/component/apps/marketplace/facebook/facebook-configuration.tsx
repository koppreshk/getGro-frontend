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

declare global {
  interface Window {
    FB: any;
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
    const initializeFB = () => {
      if (!window.FB) {
        console.error('FB SDK not loaded properly.');
        return;
      }
      window.FB.init({
        appId: import.meta.env.VITE_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v21.0',
      });
      window.FB.AppEvents.logPageView();
      setFbSdkReady(true);
    };

    if (!document.getElementById('facebook-jssdk')) {
      const fjs = document.getElementsByTagName('script')[0];
      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = 'https://connect.facebook.net/en_US/sdk.js';

      js.onload = initializeFB;

      fjs.parentNode?.insertBefore(js, fjs);
    } else if (window.FB) {
      initializeFB();
    }
  }, []);

  const handleFBLogin = () => {
    if (!fbSdkReady || !window.FB) {
      console.warn('Facebook SDK is not initialized yet.');
      return;
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
      disabled={!fbSdkReady}
    >
      {mode === 'authenticate' ? t('authenticate') : t('re_authenticate')}
    </LoadingButton>
  );
};
