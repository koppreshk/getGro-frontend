import { useServiceClient } from 'lib';
import { AllPermissionKeys } from 'lib/enums';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { RolesEndPoint, RolesQueryKey } from './api-enums';
import { AgentsQueryKey } from '../agents/apis';

export interface IAddRemoveRoleArgs {
  role_id?: number | string;
  permissions: AllPermissionKeys[];
  modules: string[];
  role: string;
  description: string;
}

export const useAddRemoveRole = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createDeleteRole = React.useCallback(
    (args: IAddRemoveRoleArgs) =>
      postData(RolesEndPoint.ADD_REMOVE_ROLE, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: RolesQueryKey.ADD_REMOVE_ROLE,
    mutationFn: createDeleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries(AgentsQueryKey.FETCH_ALL_ROLES);
    },
  });
};
