import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TemplatesTypeEndPoint, TemplatesTypeQueryKey } from './api-enums';

interface ICreateStatusArgs {
  name: string;
}

export const useCreateTemplates = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createticketStatus = React.useCallback(
    (args: ICreateStatusArgs) =>
      postData(TemplatesTypeEndPoint.CREATE_STATUS, {
        name: args.name,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: TemplatesTypeQueryKey.CREATE_STATUS,
    mutationFn: createticketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(TemplatesTypeQueryKey.FETCH_ALL_STATUSES);
    },
  });
};
