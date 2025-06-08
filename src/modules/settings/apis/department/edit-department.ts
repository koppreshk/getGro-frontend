import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './api-enums';

export interface IEditTagArgs {
  id: string;
  name: string;
}

export const useEditDepartment = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const editTag = React.useCallback(
    (args: IEditTagArgs) =>
      postData(`${DepartmentEndPoint.EDIT_DEPARTMENT}`, {
        id: args.id,
        name: args.name,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: DepartmentQueryKey.EDIT_DEPARTMENT,
    mutationFn: editTag,
    onSuccess: () => {
      queryClient.invalidateQueries(DepartmentQueryKey.FETCH_ALL_DEPARTMENT);
    },
  });
};
