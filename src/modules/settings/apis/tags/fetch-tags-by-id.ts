import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './apis';

export interface ITag {
  id: number;
  name: string;
  tickets: number;
  can_delete: boolean;
}

export const useFetchTagsById = (id: number) => {
  const { getData } = useServiceClient();

  const fetchTagsById = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ConfigurationsEndPoint.FETCH_TAGS_BY_ID}?id=${id}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, id]
  );

  return useQuery<ITag>({
    queryKey: [ConfigurationsQueryKey.FETCH_TAGS_BY_ID, id],
    queryFn: fetchTagsById,
  });
};
