import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from './apis';

export interface IPriorities {
  id: number;
  name: string;
}

export const useFetchPriorities = () => {
  const { getData } = useServiceClient();

  const getOrderDetailsData = React.useCallback(
    () =>
      getData(`${TicketsEndPoint.FETCH_PRIORITY_DROPDOWN_VALUES}`).then((res) =>
        res.json()
      ),
    [getData]
  );
  return useQuery<IPriorities[], { message: string }>({
    queryKey: [TicketsQueryKey.FETCH_PRIORITY_DROPDOWN_VALUES],
    queryFn: getOrderDetailsData,
    cacheTime: 0,
  });
};
