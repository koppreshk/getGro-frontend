import { useServiceClient } from 'lib';
import { useGetQueryEndPoint } from 'modules/tickets/containers';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

interface IUpdateDepartmentArgs {
  ticket_id: number;
  department_id: number | null;
}

export const useUpdateDepartment = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();

  const updateDepartment = useCallback(
    (args: IUpdateDepartmentArgs) =>
      postData(TicketsEndPoint.UPDATE_DEPARTMENT, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.UPDATE_DEPARTMENT],
    mutationFn: updateDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
