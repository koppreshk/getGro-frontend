import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import { LoginEndPoint, LoginQueryKey } from './api-enums';

interface IForgotPassowordArgs {
  email: string;
}

export const useForgotPassword = () => {
  const { postData } = useServiceClient();

  const onForgotPassword = React.useCallback(
    (args: IForgotPassowordArgs) =>
      postData(LoginEndPoint.FORGOT_PASSWORD, {
        email: args.email,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationFn: onForgotPassword,
    mutationKey: [LoginQueryKey.FORGOT_PASSWORD],
  });
};
