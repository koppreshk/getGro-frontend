import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './apis';

export interface ITag {
  id: number;
  name: string;
  tickets: number;
  can_delete: boolean;
}

export const useFetchTagsById = (id: number) => {
  const { getData } = useServiceClient();

  const fetchTagsById = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${DepartmentEndPoint.FETCH_DEPARTMENT_BY_ID}?id=${id}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, id]
  );

  return useQuery<ITag>({
    queryKey: [DepartmentQueryKey.FETCH_DEPARTMENT_BY_ID, id],
    queryFn: fetchTagsById,
  });
};
