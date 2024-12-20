import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './api-enums';
import { ITag } from './fetch-tags-by-id';

export const useFetchAllTags = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllTags = React.useCallback(
    () =>
      getData(`${ConfigurationsEndPoint.FETCH_ALL_TAGS}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<ITag[], { message: string }>({
    queryKey: [ConfigurationsQueryKey.FETCH_ALL_TAGS],
    queryFn: fetchAllTags,
    enabled: isEnabled,
  });
};
