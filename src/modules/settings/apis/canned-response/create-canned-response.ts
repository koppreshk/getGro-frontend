import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { CannedResponseEndPoint, CannedResponseQueryKey } from './apis';

interface ICreateStatusArgs {
  name: string;
  body: string;
}

export const useCreateCannedResponse = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createticketStatus = React.useCallback(
    (args: ICreateStatusArgs) =>
      postData(CannedResponseEndPoint.CREATE_CANNED_RESPONSE, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: CannedResponseQueryKey.CREATE_CANNED_RESPONSE,
    mutationFn: createticketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(
        CannedResponseQueryKey.FETCH_ALL_CANNED_RESPONSEES
      );
    },
  });
};
