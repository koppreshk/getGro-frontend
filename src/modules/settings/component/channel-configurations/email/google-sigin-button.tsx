import { useGoogleLogin } from '@react-oauth/google';
import { t } from 'i18next';
import { useNotifications } from 'lib';
import { useNylasGoogleOAuth } from 'modules/settings/apis';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignInButton = () => {
  const buttonRef = useRef(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  const { showNotification } = useNotifications();
  const { mutateAsync } = useNylasGoogleOAuth();

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

  useEffect(() => {
    // Function to check if Google script is loaded
    const checkGoogleScriptLoaded = () => {
      if (window.google?.accounts?.id) {
        setGoogleScriptLoaded(true);
      } else {
        // Check again in 100ms
        setTimeout(checkGoogleScriptLoaded, 100);
      }
    };

    checkGoogleScriptLoaded();
  }, []);

  useEffect(() => {
    // Only initialize when script is loaded
    if (googleScriptLoaded && buttonRef.current) {
      //@ts-ignore
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
        callback: () => {
          login();
        },
      });

      //@ts-ignore
      google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
      });
    }
  }, [googleScriptLoaded, login]);

  // Show loading state or placeholder while script loads
  if (!googleScriptLoaded) {
    return <div>Loading Google Sign-In...</div>;
  }

  return <div>{<div ref={buttonRef}></div>}</div>; // Container for the button
};

export default GoogleSignInButton;
