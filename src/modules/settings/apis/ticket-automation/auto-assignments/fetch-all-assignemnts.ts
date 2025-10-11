import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { AutoMationType } from '.';
import { AutoAssignmentEndPoint, AutoAssignmentQueryKey } from './apis';

export interface IAllAssignments {
  id: number;
  name: string;
  last_modified_by: string;
  last_modified: string;
  is_active: boolean;
}

export const useFetchAllAssignments = (automationType: AutoMationType) => {
  const { getData } = useServiceClient();

  const fetchAllAssignments = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${AutoAssignmentEndPoint.FETCH_ALL_ASSIGNMENTS}?automation_type=${automationType}`,
        extra: { signal },
      }).then((res) => res.json()),
    [automationType, getData]
  );

  return useQuery<IAllAssignments[], { message: string }>({
    queryKey: [AutoAssignmentQueryKey.FETCH_ALL_ASSIGNMENTS, automationType],
    queryFn: fetchAllAssignments,
  });
};
