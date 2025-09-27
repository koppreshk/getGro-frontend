import { useServiceClient } from 'lib';
import { ChatQueryKeys } from 'modules/chats/apis';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useMatch } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from './apis';
import { useGetQueryEndPoint } from '../containers';

interface ICreateManualTicketArgs {
  requester_email: string;
  subject: string;
  description: string;
  ticket_assignee_type: 'auto' | 'manual';
  priority_id: string;
  tags: (string | number)[];
  queue_id?: string;
  assigned_to?: string;
  /**
   * For chats only, send the below id so that ticket is created and linked
   */
  conversation_id?: string | number;
  ticket_type?: 'ivr' | 'email' | 'google_review';
  phone_number?: string;
  customer_name?: string;
  department_id?: string;
  resolution?: string;
  status?: string | number;
}

export const useCreateManualTicket = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const queryKey = useGetQueryEndPoint();
  const match = useMatch('/chats/:id');

  const createManualTicket = useCallback(
    (args: ICreateManualTicketArgs) =>
      postData(`${TicketsEndPoint.CREATE_MANUAL_TICKET}`, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.CREATE_MANUAL_TICKET],
    mutationFn: createManualTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(
        match?.params.id ? ChatQueryKeys.FETCH_ALL_CONVERSATIONS : queryKey
      );
    },
  });
};
