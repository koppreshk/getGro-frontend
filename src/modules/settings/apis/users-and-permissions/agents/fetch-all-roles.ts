import { useServiceClient } from 'lib';
import { AllPermissionKeys } from 'lib/enums';
import React from 'react';
import { useQuery } from 'react-query';

import { AgentsEndPoint, AgentsQueryKey } from './api-enums';

export interface IRoles {
  id: number;
  name: string;
  description: string;
  can_edit_role: boolean;
  role_type: 'system' | 'user';
  agents: number;
  modules: string[];
  permissions: AllPermissionKeys[];
}

export const useFetchAllRoles = () => {
  const { getData } = useServiceClient();

  const fetchAllRoles = React.useCallback(
    () => getData(AgentsEndPoint.FETCH_ALL_ROLES).then((res) => res.json()),
    [getData]
  );

  return useQuery<IRoles[], { message: string }>({
    queryKey: AgentsQueryKey.FETCH_ALL_ROLES,
    queryFn: fetchAllRoles,
  });
};
