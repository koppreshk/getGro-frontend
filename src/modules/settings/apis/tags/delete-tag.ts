import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './api-enums';

export interface IDeleteTagArgs {
  id: number;
}

export const useDeleteTag = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteTag = React.useCallback(
    (args: IDeleteTagArgs) =>
      postData(`${ConfigurationsEndPoint.DELETE_TAG}`, {
        id: args.id,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsQueryKey.DELETE_TAG,
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_ALL_TAGS);
    },
  });
};
