import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { CannedResponseEndPoint, CannedResponseQueryKey } from './api-enums';

interface IEditStatusArgs {
  id: number;
  name: string;
  body: string;
  is_active: boolean;
}

export const useEditCannedResponse = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editDisposition = React.useCallback(
    (args: IEditStatusArgs) =>
      postData(CannedResponseEndPoint.EDIT_CANNED_RESPONSE, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: CannedResponseQueryKey.EDIT_CANNED_RESPONSE,
    mutationFn: editDisposition,
    onSuccess: () => {
      queryClient.invalidateQueries(
        CannedResponseQueryKey.FETCH_ALL_CANNED_RESPONSEES
      );
    },
  });
};
