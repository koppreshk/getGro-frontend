import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ConfigurationsEmailEndPoint,
  ConfigurationsEmailQueryKey,
} from './apis';

export interface ISetupEmailArgs {
  email: string;
}

export const useSetupEmail = () => {
  const { postData } = useServiceClient();

  const setupEmail = React.useCallback(
    (args: ISetupEmailArgs) =>
      postData(`${ConfigurationsEmailEndPoint.SETUP_EMAIL}`, {
        email: args.email,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsEmailQueryKey.SETUP_EMAIL,
    mutationFn: setupEmail,
  });
};
