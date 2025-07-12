import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from './api-enums';
import { useGetQueryEndPoint } from '../containers';

interface IUpdateTicketInfoArgs {
  ticket_id: string | number;
  type?: string; // resolution/description
  text?: string; // text to update
}

export const useUpdateTicketInfo = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();

  const UpdateTicketInfo = useCallback(
    (args: IUpdateTicketInfoArgs) =>
      postData(`${TicketsEndPoint.UPDATE_TICKET_INFO}`, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.UPDATE_TICKET_INFO],
    mutationFn: UpdateTicketInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
