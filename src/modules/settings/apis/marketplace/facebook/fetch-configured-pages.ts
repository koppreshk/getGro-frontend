import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import {
  FacebookConfigurationEndPoint,
  FacebookConfigurationQueryKey,
} from './apis';

export interface IFacebookConfiguredPages {
  id: number;
  page_name: string;
  page_id: string;
  comment_configuration: string;
  specific_keywords: string[];
  can_send_auto_reply: boolean;
  auto_reply_text: string;
  queue_id: number | null;
  name: string;
  admin: string;
  created_at: string;
  updated_at: string;
}

export const useFetchConfiguredPages = () => {
  const { getData } = useServiceClient();

  const fetchFacebookConfigurations = React.useCallback(
    () =>
      getData(FacebookConfigurationEndPoint.FETCH_CONFIGURED_PAGES).then(
        (res) => res.json()
      ),
    [getData]
  );

  return useQuery<IFacebookConfiguredPages[]>({
    queryFn: fetchFacebookConfigurations,
    queryKey: FacebookConfigurationQueryKey.FETCH_CONFIGURED_PAGES,
  });
};
