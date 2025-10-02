import { useServiceClient } from 'lib';
import { useAppSelector } from 'lib/hooks';
import { useGetQueryEndPoint } from 'modules/tickets/containers';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';

interface IUpdateStatusArgs {
  ticketId: number;
  statusId: number;
}

export const useUpdateStatus = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();
  const isAdvanceFiltersEnabled = useAppSelector(
    (state) => state.tickets.isAdvanceFiltersEnabled
  );

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
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isAdvanceFiltersEnabled
        ? queryClient.refetchQueries('ALL_TICKETS_ADVANCED')
        : queryClient.invalidateQueries(queryKey);
    },
  });
};
