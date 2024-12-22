import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { StatusTypeEndPoint, StatusTypeQueryKey } from './api-enums';

interface IEditStatusArgs {
  id: number;
  name: string;
}

export const useEditTicketStatus = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editDisposition = React.useCallback(
    (args: IEditStatusArgs) =>
      postData(StatusTypeEndPoint.EDIT_STATUS, {
        id: args.id,
        name: args.name,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: StatusTypeQueryKey.EDIT_STATUS,
    mutationFn: editDisposition,
    onSuccess: () => {
      queryClient.invalidateQueries(StatusTypeQueryKey.FETCH_ALL_STATUSES);
    },
  });
};
