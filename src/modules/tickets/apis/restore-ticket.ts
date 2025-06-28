import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from './api-enums';
import { useGetQueryEndPoint } from '../containers';

interface IDeleteTicketArgs {
  ticket_id: string | number;
}

export const useRestoreTicket = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();

  const DeleteTicket = useCallback(
    (args: IDeleteTicketArgs) =>
      postData(`${TicketsEndPoint.RESTORE_TICKET}`, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.RESTORE_TICKET],
    mutationFn: DeleteTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
