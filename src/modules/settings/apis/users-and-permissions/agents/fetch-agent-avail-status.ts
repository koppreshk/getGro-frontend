import { useServiceClient } from 'lib';
import React from 'react';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { AgentsEndPoint, AgentsQueryKey } from './apis';

export interface AvailabilityStatuses {
  availability_status_id: number;
  name: string;
  description: string;
  is_active: boolean;
  default_status: boolean;
}

export const useFetchAvailabilityStatuses = () => {
  const { getData } = useServiceClient();

  const fetchAvailabilityStatuses = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${AgentsEndPoint.AVAILABILITY_STATUSES}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<AvailabilityStatuses[], { message: string }>({
    queryKey: [AgentsQueryKey.AVAILABILITY_STATUSES],
    queryFn: fetchAvailabilityStatuses,
  });
};

export const useFetchCurrentStatus = () => {
  const { getData } = useServiceClient();

  const fetchCurrentStatus = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${AgentsEndPoint.CURRENT_STATUS}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<
    {
      id: number;
      name: string;
    },
    { message: string }
  >({
    queryKey: [AgentsQueryKey.CURRENT_STATUS],
    queryFn: fetchCurrentStatus,
  });
};

export const useUpdateStatus = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const updateStatus = React.useCallback(
    (args: { availability_status_id: string | number }) =>
      postData(AgentsEndPoint.UPDATE_STATUS, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: AgentsQueryKey.UPDATE_STATUS,
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(AgentsQueryKey.CURRENT_STATUS);
    },
  });
};
