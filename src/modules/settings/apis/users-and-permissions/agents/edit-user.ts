import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { AgentsQueryKey, AgentsEndPoint } from './apis';
import { ICreateUserArgs } from './create-user';

export const useEditUser = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editUser = React.useCallback(
    (args: ICreateUserArgs & { id: string | number }) =>
      postData(AgentsEndPoint.EDIT_USER, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: AgentsQueryKey.EDIT_USER,
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_USERS);
    },
  });
};
