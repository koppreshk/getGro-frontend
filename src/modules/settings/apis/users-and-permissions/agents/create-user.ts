import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { AgentsQueryKey, AgentsEndPoint } from './apis';

export interface ICreateUserArgs {
  name: string;
  display_name: string;
  email_address: string;
  phone_number: string;
  role_id: number | string;
}

export const useCreateUser = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createUser = React.useCallback(
    (args: ICreateUserArgs) =>
      postData(AgentsEndPoint.CREATE_USER, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: AgentsQueryKey.CREATE_USER,
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_USERS);
    },
  });
};
