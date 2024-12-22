import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import {
  ConfigurationsEmailEndPoint,
  ConfigurationsEmailQueryKey,
} from './api-enums';

export const useDeleteEmail = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteEmail = React.useCallback(
    (args: { id: number }) =>
      postData(
        `${ConfigurationsEmailEndPoint.DELETE_EMAIL}?id=${args.id}`
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsEmailQueryKey.DELETE_EMAIL,
    mutationFn: deleteEmail,
    onSuccess: () => {
      queryClient.invalidateQueries(
        ConfigurationsEmailQueryKey.FETCH_ALL_EMAILS
      );
    },
  });
};
