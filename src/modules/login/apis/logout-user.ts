import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { LoginEndPoint, LoginQueryKey } from './apis';

export const useLogoutUser = () => {
  const { postData } = useServiceClient();

  const onLogout = React.useCallback(
    () => postData(LoginEndPoint.LOGOUT).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: LoginQueryKey.LOGOUT,
    mutationFn: onLogout,
  });
};
