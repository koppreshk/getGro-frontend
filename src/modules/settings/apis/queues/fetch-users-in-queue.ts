import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './apis';

export interface IQueueUsers {
  firstName: string;
  lastName: string;
  id: number;
}

export const useFetchUsersInQueue = (queueId: string) => {
  const { getData } = useServiceClient();

  const fetchTicketMetadata = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ConfigurationsEndPoint.FETCH_USERS_IN_QUEUE}?queue_id=${queueId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, queueId]
  );

  return useQuery<IQueueUsers[]>({
    queryFn: fetchTicketMetadata,
    queryKey: [ConfigurationsQueryKey.FETCH_USERS_IN_QUEUE, queueId],
  });
};
