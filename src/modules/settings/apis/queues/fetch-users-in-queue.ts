import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './api-enums';

export interface IQueueUsers {
  firstName: string;
  lastName: string;
  id: number;
}

export const useFetchUsersInQueue = (queueId: string) => {
  const { getData } = useServiceClient();

  const fetchTicketMetadata = React.useCallback(
    () =>
      getData(
        `${ConfigurationsEndPoint.FETCH_USERS_IN_QUEUE}?queue_id=${queueId}`
      ).then((res) => res.json()),
    [getData, queueId]
  );

  return useQuery<IQueueUsers[]>({
    queryFn: fetchTicketMetadata,
    queryKey: [ConfigurationsQueryKey.FETCH_USERS_IN_QUEUE, queueId],
  });
};
