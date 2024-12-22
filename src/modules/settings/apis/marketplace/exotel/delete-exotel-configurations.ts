import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './api-enums';

export const useDeleteExotelConfiguration = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteExotelConfig = React.useCallback(
    () =>
      postData(ExotelConfigurationEndPoint.DELETE_EXOTEL_CONFIG).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationFn: deleteExotelConfig,
    mutationKey: ExotelConfigurationQueryKey.DELETE_EXOTEL_CONFIG,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ExotelConfigurationQueryKey.FETCH_EXOTEL_CONFIG
      );
    },
  });
};
