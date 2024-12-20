import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  FacebookConfigurationEndPoint,
  FacebookConfigurationQueryKey,
} from './api-enum';

export const useDeleteFacebookConfiguration = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteFacebookConfig = React.useCallback(
    () =>
      postData(
        FacebookConfigurationEndPoint.DELETE_FACEBOOK_CONFIGURATION
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationFn: deleteFacebookConfig,
    mutationKey: FacebookConfigurationQueryKey.DELETE_FACEBOOK_CONFIGURATION,
    onSuccess: () => {
      queryClient.invalidateQueries(
        FacebookConfigurationQueryKey.FETCH_FACEBOOK_CONFIGURATION
      );
    },
  });
};
