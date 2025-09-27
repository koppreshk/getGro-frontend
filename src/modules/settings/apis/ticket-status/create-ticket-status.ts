import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { StatusTypeEndPoint, StatusTypeQueryKey } from './apis';

interface ICreateStatusArgs {
  name: string;
  description?: string;
}

export const useCreateTicketStatus = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createticketStatus = React.useCallback(
    (args: ICreateStatusArgs) =>
      postData(StatusTypeEndPoint.CREATE_STATUS, {
        name: args.name,
        description: args.description,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: StatusTypeQueryKey.CREATE_STATUS,
    mutationFn: createticketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(StatusTypeQueryKey.FETCH_ALL_STATUSES);
    },
  });
};
