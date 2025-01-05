import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation } from 'react-query';

import {
  ConfigurationsEmailEndPoint,
  ConfigurationsEmailQueryKey,
} from './api-enums';

export interface INylasGoogleOAuthArgs {
  code: string;
}

export const useNylasGoogleOAuth = () => {
  const { postData } = useServiceClient();

  const nylasOAuth = React.useCallback(
    (args: INylasGoogleOAuthArgs) =>
      postData(`${ConfigurationsEmailEndPoint.NYLAS_GOOGLE_OAUTH}`, {
        code: args.code,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsEmailQueryKey.NYLAS_GOOGLE_OAUTH,
    mutationFn: nylasOAuth,
  });
};
