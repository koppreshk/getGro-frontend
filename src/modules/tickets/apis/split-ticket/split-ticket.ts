import { useServiceClient } from 'lib';
import { useGetQueryEndPoint } from 'modules/tickets/containers';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';

interface ISplitTicketArgs {
  ticket_id: number;
  subject: string;
  description: string;
  ticket_assignee_type: 'auto' | 'manual';
  copy_attachments: boolean;
  association_type: 'link_ticket' | 'no_associate';
}

export const useSplitTicket = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();

  const splitTicket = React.useCallback(
    async (args: ISplitTicketArgs) => {
      return postData(TicketsEndPoint.SPLIT_TICKET, args).then((res) =>
        res.json()
      );
    },
    [postData]
  );

  return useMutation({
    mutationFn: splitTicket,
    mutationKey: TicketsQueryKey.SPLIT_TICKET,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
