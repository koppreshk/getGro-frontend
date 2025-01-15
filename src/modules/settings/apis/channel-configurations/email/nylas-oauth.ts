import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ConfigurationsEmailEndPoint,
  ConfigurationsEmailQueryKey,
} from './api-enums';

export interface INylasOAuthArgs {
  code: string;
  displayName: string;
  isActive: boolean;
}

export const useNylasOAuth = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const nylasOAuth = React.useCallback(
    (args: INylasOAuthArgs) =>
      postData(`${ConfigurationsEmailEndPoint.NYLAS_OAUTH}`, {
        code: args.code,
        display_name: args.displayName,
        can_create_ticket: args.isActive,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsEmailQueryKey.NYLAS_OAUTH,
    mutationFn: nylasOAuth,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsEmailQueryKey.FETCH_ALL_EMAILS
      );
    },
  });
};
