import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import {
  ConfigurationsEmailQueryKey,
  ConfigurationsEmailEndPoint,
} from './api-enums';

export interface IEmails {
  id: number;
  display_name: string;
  email: string;
  can_create_ticket: boolean;
  updated_at: string;
}

export const useFetchAllEmails = () => {
  const { getData } = useServiceClient();

  const fetchAllEmails = React.useCallback(
    () =>
      getData(`${ConfigurationsEmailEndPoint.FETCH_ALL_EMAILS}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<IEmails[], { message: string }>({
    queryKey: ConfigurationsEmailQueryKey.FETCH_ALL_EMAILS,
    queryFn: fetchAllEmails,
  });
};
