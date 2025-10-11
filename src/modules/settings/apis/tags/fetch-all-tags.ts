import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './apis';
import { ITag } from './fetch-tags-by-id';

export const useFetchAllTags = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllTags = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ConfigurationsEndPoint.FETCH_ALL_TAGS}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<ITag[], { message: string }>({
    queryKey: [ConfigurationsQueryKey.FETCH_ALL_TAGS],
    queryFn: fetchAllTags,
    enabled: isEnabled,
  });
};
