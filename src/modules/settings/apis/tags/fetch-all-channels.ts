import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './api-enums';

export interface IChannels {
  channel_id: number;
  name: string;
}

export const useFetchAllChannels = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllChannels = React.useCallback(
    () =>
      getData(`${ConfigurationsEndPoint.FETCH_ALL_CHANNELS}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<IChannels[]>({
    queryKey: [ConfigurationsQueryKey.FETCH_ALL_CHANNELS],
    queryFn: fetchAllChannels,
    enabled: isEnabled,
  });
};
