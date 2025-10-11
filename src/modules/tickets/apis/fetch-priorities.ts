import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from './apis';

export interface IPriorities {
  id: number;
  name: string;
}

export const useFetchPriorities = () => {
  const { getData } = useServiceClient();

  const getOrderDetailsData = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_PRIORITY_DROPDOWN_VALUES}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );
  return useQuery<IPriorities[], { message: string }>({
    queryKey: [TicketsQueryKey.FETCH_PRIORITY_DROPDOWN_VALUES],
    queryFn: getOrderDetailsData,
    cacheTime: 0,
  });
};
