/* eslint-disable @typescript-eslint/no-explicit-any */
import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useFacebookConfiguration } from 'modules/settings/apis/marketplace/facebook';
import { useEffect } from 'react';
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
  const { mutateAsync } = useFacebookConfiguration();

  useEffect(() => {
    // Initialize the Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FB_APP_ID, // Replace with your Facebook App ID
        cookie: true,
        xfbml: true,
        version: 'v21.0', // Use the latest version
      });
      window.FB.AppEvents.logPageView();
    };

    // Load the Facebook SDK script dynamically
    (function (d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      const js: any = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // Facebook login handler
  const handleFBLogin = () => {
    window.FB.login(
      (response: FacebookResponse) => {
        if (response.authResponse) {
          console.log('Logged in!', response);
          mutateAsync({
            code: response.authResponse.code,
          }).then(() => {
            props.updateInstallation();
          });

          // Fetch user details like name and email
          window.FB.api('/me', { fields: 'name, email' }, (userInfo: any) => {
            console.log('User info:', userInfo);
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
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
    <>
      <Button
        variant="contained"
        size="medium"
        onClick={handleFBLogin}
        endIcon={<Login />}
      >
        {mode === 'authenticate' ? t('authenticate') : t('re_authenticate')}
      </Button>
    </>
  );
};
