import { t } from 'i18next';
import { useNotifications } from 'lib';
import { PageBlockingLoader } from 'lib/ui-ux';
import { useNylasGoogleOAuth } from 'modules/settings/apis';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignInButton = (props: { isDisabled?: boolean }) => {
  const { isDisabled } = props;
  const { showNotification } = useNotifications();
  const { mutateAsync, isLoading } = useNylasGoogleOAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');
  const buttonRef = useRef(null);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);

  const scopes = {
    send: 'https://www.googleapis.com/auth/gmail.send',
    readOnly: 'https://www.googleapis.com/auth/gmail.readonly',
    modify: 'https://www.googleapis.com/auth/gmail.modify',
    compose: 'https://www.googleapis.com/auth/gmail.compose',
    email: 'https://www.googleapis.com/auth/userinfo.email',
    profile: 'https://www.googleapis.com/auth/userinfo.profile',
    labels: 'https://www.googleapis.com/auth/gmail.labels',
    openid: 'openid',
  };

  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  const allScopes = Object.values(scopes).join(' ');
  const redirectUri = `${import.meta.env.VITE_SUB_DOMAIN}configurations/email`;

  const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${encodeURIComponent(allScopes)}&access_type=offline&prompt=consent`;

  const login = useCallback(() => {
    window.open(url, '_blank')?.focus();
  }, [url]);

  useEffect(() => {
    if (code) {
      mutateAsync({ code: code })
        .then((res) => {
          if (res.status) {
            showNotification({
              message: t('google_login_success'),
              type: 'success',
            });
            searchParams.forEach((_value, key) => {
              searchParams.delete(key);
            });
            setSearchParams(searchParams);
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
    }
  }, [code, mutateAsync, searchParams, setSearchParams, showNotification]);

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

  return (
    <>
      <PageBlockingLoader loading={isLoading} />
      <div
        ref={buttonRef}
        style={{
          pointerEvents: isDisabled ? 'none' : 'auto',
          opacity: isDisabled ? 0.6 : 1,
        }}
      />
    </>
  );
};

export default GoogleSignInButton;
