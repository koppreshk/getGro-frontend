import { useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { DepartmentEndPoint, DepartmentQueryKey } from './apis';

export interface ICreateDepartmentArgs {
  tags: string[];
}

export const useCreateDepartment = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const createDepartment = React.useCallback(
    (args: ICreateDepartmentArgs) =>
      postData(`${DepartmentEndPoint.CREATE_TICKET_DEPARTMENT}`, args).then(
        (res) => res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: DepartmentQueryKey.CREATE_TICKET_DEPARTMENT,
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(DepartmentQueryKey.FETCH_ALL_DEPARTMENT);
    },
  });
};
