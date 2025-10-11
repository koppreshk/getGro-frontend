import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import {
  FacebookConfigurationEndPoint,
  FacebookConfigurationQueryKey,
} from './apis';

export interface IFacebookAssociatedPages {
  page_name: string;
  page_id: string;
}

export const useFetchAssociatedPages = () => {
  const { getData } = useServiceClient();

  const fetchFacebookConfigurations = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: FacebookConfigurationEndPoint.FETCH_ASSOICATED_PAGES,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IFacebookAssociatedPages[]>({
    queryFn: fetchFacebookConfigurations,
    queryKey: FacebookConfigurationQueryKey.FETCH_ASSOICATED_PAGES,
  });
};
