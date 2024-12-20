import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  InstagramConfigurationEndPoint,
  InstagramConfigurationQueryKey,
} from './api-enum';

export const useDeleteInstagramConfiguration = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteInstagramConfig = React.useCallback(
    () =>
      postData(
        InstagramConfigurationEndPoint.DELETE_INSTAGRAM_CONFIGURATION
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationFn: deleteInstagramConfig,
    mutationKey: InstagramConfigurationQueryKey.DELETE_INSTAGRAM_CONFIGURATION,
    onSuccess: () => {
      queryClient.invalidateQueries(
        InstagramConfigurationQueryKey.FETCH_INSTAGRAM_CONFIGURATION
      );
    },
  });
};
