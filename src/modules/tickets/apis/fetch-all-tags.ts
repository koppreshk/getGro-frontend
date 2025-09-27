import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from './apis';

export interface ITag {
  id: number;
  name: string;
  tickets: number;
  can_delete: boolean;
}

export const useFetchAllTags = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllTags = React.useCallback(
    () =>
      getData(`${TicketsEndPoint.FETCH_ALL_TAGS}`).then((res) => res.json()),
    [getData]
  );

  return useQuery<ITag[], { message: string }>({
    queryKey: [TicketsQueryKey.FETCH_ALL_TAGS],
    queryFn: fetchAllTags,
    enabled: isEnabled,
  });
};
