import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ConfigurationsEndPoint, ConfigurationsQueryKey } from './apis';
import { Employee } from './fetch-all-queues';

export interface IQueueMetadata {
  employees: Employee[];
}

export const useFetchTicketMetadata = () => {
  const { getData } = useServiceClient();

  const fetchTicketMetadata = React.useCallback(
    () =>
      getData(`${ConfigurationsEndPoint.FETCH_DROPDOWN_VALUES}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<IQueueMetadata>({
    queryKey: ConfigurationsQueryKey.FETCH_DROPDOWN_VALUES,
    queryFn: fetchTicketMetadata,
  });
};
