import { toCamelCasedKeysFromUnderScores } from 'lib/utils';
import React from 'react';
import { useMutation } from 'react-query';

import { LoginEndPoint, LoginQueryKey } from './api-enums';

export const useUpdatePassword = () => {
  const onUpdatePassword = React.useCallback(
    (data: { password: string; token: string; currentPassword?: string }) => {
      const restURl = import.meta.env.VITE_REST_URL;
      const subDomainValue =
        import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

      return fetch(`${restURl}${LoginEndPoint.UPDATE_PASSWORD}`, {
        method: 'POST',
        headers: {
          Authorization: data.token,
          'Content-Type': 'application/json',
          'sub-domain': subDomainValue,
        },
        body: JSON.stringify({
          password: data.password,
          current_password: data?.currentPassword,
        }),
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error(`Failed to update password:  ${res.statusText}`);
          }
          return res.json();
        })
        .then((finalRes) => {
          return toCamelCasedKeysFromUnderScores(finalRes);
        });
    },
    []
  );

  return useMutation({
    mutationFn: onUpdatePassword,
    mutationKey: [LoginQueryKey.UPDATE_PASSWORD],
  });
};
