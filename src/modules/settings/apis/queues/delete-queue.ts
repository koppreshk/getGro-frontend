import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './apis';

export const useDeleteQueue = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteQueue = React.useCallback(
    (args: { id: number }) =>
      postData(`${ConfigurationsEndPoint.DELETE_QUEUE}?id=${args.id}`).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsQueryKey.DELETE_QUEUE,
    mutationFn: deleteQueue,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsQueryKey.FETCH_ALL_TICKETS_QUEUE
      );
    },
  });
};
