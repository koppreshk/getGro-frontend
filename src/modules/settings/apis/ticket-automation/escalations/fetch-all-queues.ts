import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { EscalationQueryKey, EscalationEndPoint } from './api-enums';

export interface IQueueMetadata {
  id: number;
  name: string;
  uniqueKey: string;
}

export const useFetchAllQueues = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllQueues = React.useCallback(
    () =>
      getData(`${EscalationEndPoint.FETCH_ALL_QUEUES}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<IQueueMetadata[]>({
    queryKey: EscalationQueryKey.FETCH_ALL_QUEUES,
    queryFn: fetchAllQueues,
    enabled: isEnabled,
  });
};
