import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { AgentsEndPoint, AgentsQueryKey } from './apis';

export interface IUserById {
  id: number;
  name: string;
  role_id: number;
  email: string;
  phone_number: string;
  display_name: string;
  last_seen_at: string | null;
}

export const useFetchUserById = (id: number | string) => {
  const { getData } = useServiceClient();

  const fetchUserById = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${AgentsEndPoint.FETCH_USER_BY_ID}?id=${id}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, id]
  );

  return useQuery<IUserById, { message: string }>({
    queryKey: [id, AgentsQueryKey.FETCH_USER_BY_ID],
    queryFn: fetchUserById,
  });
};
