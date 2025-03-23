import { toCamelCasedKeysFromUnderScores } from 'lib/utils';
import React from 'react';
import { useMutation } from 'react-query';

import { LoginEndPoint, LoginQueryKey } from './api-enums';

export type LoginResult = {
  authToken: string;
  name: string;
  clientId: string;
  userId: string;
  role: 'Agent' | 'Admin' | 'Account Owner' | string;
};

export const useLoginUser = () => {
  const onLoginUser = React.useCallback(
    (data: { email: string; password: string; recaptcha: string | null }) => {
      const restURl = import.meta.env.VITE_REST_URL;
      const subDomainValue =
        import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

      return fetch(`${restURl}${LoginEndPoint.LOGIN_USER}`, {
        method: 'POST',
        body: JSON.stringify({
          email_address: data.email,
          password: data.password,
          recaptcha: data.recaptcha,
        }),
        headers: {
          'sub-domain': subDomainValue,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error(`Failed to login:  ${res.statusText}`);
          }
          return res.json();
        })
        .then((finalRes) => {
          return toCamelCasedKeysFromUnderScores(finalRes) as LoginResult;
        });
    },
    []
  );

  return useMutation({
    mutationFn: onLoginUser,
    mutationKey: [LoginQueryKey.LOGIN_USER],
  });
};
