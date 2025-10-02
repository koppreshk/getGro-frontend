import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ExotelConfigurationEndPoint,
  ExotelConfigurationQueryKey,
} from './apis';

export interface IDeleteExophoneNumber {
  id: number;
}

export const useDeleteExophoneNumber = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteExophoneNumber = React.useCallback(
    (args: IDeleteExophoneNumber) =>
      postData(ExotelConfigurationEndPoint.DELETE_EXOPHONE, args),
    [postData]
  );

  return useMutation({
    mutationFn: deleteExophoneNumber,
    mutationKey: ExotelConfigurationQueryKey.DELETE_EXOPHONE,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ExotelConfigurationQueryKey.FETCH_EXOTEL_ADDED_NUMBERS
      );
    },
  });
};
