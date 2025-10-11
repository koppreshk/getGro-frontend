import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './apis';
import { ITag } from './fetch-departments-by-id';

export const useFetchAllDepartment = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllTags = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${DepartmentEndPoint.FETCH_ALL_DEPARTMENT}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<ITag[], { message: string }>({
    queryKey: [DepartmentQueryKey.FETCH_ALL_DEPARTMENT],
    queryFn: fetchAllTags,
    enabled: isEnabled,
  });
};
