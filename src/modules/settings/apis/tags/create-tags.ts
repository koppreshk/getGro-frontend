import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './api-enums';

export interface ICreateTagArgs {
  tags: string[];
}

export const useCreateTags = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createTag = React.useCallback(
    (args: ICreateTagArgs) =>
      postData(`${ConfigurationsEndPoint.CREATE_TICKET_TAGS}`, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: ConfigurationsQueryKey.CREATE_TICKET_TAGS,
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries(ConfigurationsQueryKey.FETCH_ALL_TAGS);
    },
  });
};
