import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { EscalationQueryKey, EscalationEndPoint } from './apis';

export interface IQueueMetadata {
  id: number;
  name: string;
  uniqueKey: string;
}

export const useFetchAllQueues = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllQueues = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${EscalationEndPoint.FETCH_ALL_QUEUES}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IQueueMetadata[]>({
    queryKey: EscalationQueryKey.FETCH_ALL_QUEUES,
    queryFn: fetchAllQueues,
    enabled: isEnabled,
  });
};
