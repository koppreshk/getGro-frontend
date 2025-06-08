import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './api-enums';

export interface ITag {
  id: number;
  name: string;
  tickets: number;
  can_delete: boolean;
}

export const useFetchTagsById = (id: number) => {
  const { getData } = useServiceClient();

  const fetchTagsById = React.useCallback(
    () =>
      getData(`${DepartmentEndPoint.FETCH_DEPARTMENT_BY_ID}?id=${id}`).then(
        (res) => res.json()
      ),
    [getData, id]
  );

  return useQuery<ITag>({
    queryKey: [DepartmentQueryKey.FETCH_DEPARTMENT_BY_ID, id],
    queryFn: fetchTagsById,
  });
};
