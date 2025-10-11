import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './apis';

export interface IChannels {
  channel_id: number;
  name: string;
}

export const useFetchAllChannels = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllChannels = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${DepartmentEndPoint.FETCH_ALL_CHANNELS}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IChannels[]>({
    queryKey: [DepartmentQueryKey.FETCH_ALL_CHANNELS],
    queryFn: fetchAllChannels,
    enabled: isEnabled,
  });
};
