import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import {
  FacebookConfigurationEndPoint,
  FacebookConfigurationQueryKey,
} from './apis';

export interface IFacebookConfigDetails {
  user_id: string;
}

export const useFetchFacebookConfiguration = () => {
  const { getData } = useServiceClient();

  const fetchFacebookConfigurations = React.useCallback(
    () =>
      getData(FacebookConfigurationEndPoint.FETCH_FACEBOOK_CONFIGURATION).then(
        (res) => res.json()
      ),
    [getData]
  );

  return useQuery<IFacebookConfigDetails | null>({
    queryFn: fetchFacebookConfigurations,
    queryKey: FacebookConfigurationQueryKey.FETCH_FACEBOOK_CONFIGURATION,
  });
};
