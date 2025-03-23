import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { StatusTypeEndPoint, StatusTypeQueryKey } from './api-enums';
import { IGenericResponse } from './types';

export interface IFetchAllStatuses extends IGenericResponse {
  type: string;
  description?: string;
}

export const useFetchAllStatuses = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllStatuses = React.useCallback(
    () =>
      getData(StatusTypeEndPoint.FETCH_ALL_STATUSES).then((res) => res.json()),
    [getData]
  );

  return useQuery<IFetchAllStatuses[], { message: string }>({
    queryKey: StatusTypeQueryKey.FETCH_ALL_STATUSES,
    queryFn: fetchAllStatuses,
    enabled: isEnabled,
  });
};
