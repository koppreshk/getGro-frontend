import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { LoginEndPoint, LoginQueryKey } from './api-enums';

interface IResetPassowordArgs {
  email: string;
  token: string;
  password: string;
}

export const useResetPassword = () => {
  const { postData } = useServiceClient();

  const onResetPassword = React.useCallback(
    (args: IResetPassowordArgs) =>
      postData(LoginEndPoint.RESET_PASSWORD, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationFn: onResetPassword,
    mutationKey: [LoginQueryKey.RESET_PASSWORD],
  });
};
