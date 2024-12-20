import { useServiceClient } from 'lib';
import { useGetQueryEndPoint } from 'modules/tickets/containers';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

interface IUpdateStatusArgs {
  ticketId: number;
  statusId: number;
}

export const useUpdateStatus = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();

  const updateStatus = useCallback(
    (args: IUpdateStatusArgs) =>
      postData(
        `${TicketsEndPoint.UPDATE_STATUS}?ticket_id=${args.ticketId}&status_id=${args.statusId}`
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.UPDATE_STATUS],
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
