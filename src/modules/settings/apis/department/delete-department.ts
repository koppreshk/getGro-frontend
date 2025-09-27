import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './apis';

export interface IDeleteDepartmentArgs {
  id: number;
}

export const useDeleteDepartment = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteTag = React.useCallback(
    (args: IDeleteDepartmentArgs) =>
      postData(`${DepartmentEndPoint.DELETE_DEPARTMENT}`, {
        id: args.id,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: DepartmentQueryKey.DELETE_DEPARTMENT,
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries(DepartmentQueryKey.FETCH_ALL_DEPARTMENT);
    },
  });
};
