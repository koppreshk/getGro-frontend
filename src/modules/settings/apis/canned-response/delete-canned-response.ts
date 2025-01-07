import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { CannedResponseEndPoint, CannedResponseQueryKey } from './api-enums';

interface IDeleteStatusArgs {
  id: number;
}

export const useDeleteCannedResponse = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editDisposition = React.useCallback(
    (args: IDeleteStatusArgs) =>
      postData(CannedResponseEndPoint.DELETE_CANNED_RESPONSE, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: CannedResponseQueryKey.DELETE_CANNED_RESPONSE,
    mutationFn: editDisposition,
    onSuccess: () => {
      queryClient.invalidateQueries(
        CannedResponseQueryKey.FETCH_ALL_CANNED_RESPONSEES
      );
    },
  });
};
