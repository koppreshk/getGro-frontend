import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

export interface IAttachments {
  id: string;
  accountId: string | null;
  contentId: string;
  messageIds: string | null;
  object: string | null;
  contentType: string;
  filename: string;
  size: number;
  contentDisposition: string;
}

export interface Conversations {
  messageId: string;
  from: string;
  fromEmail: string;
  to: string;
  toEmail: string;
  createdAt: string;
  htmlContent: string;
  attachments: IAttachments[];
}
export interface ITicketById {
  subject: string;
  conversations: Conversations[];
  thread_id: string;
}

export const useFetchEmailConversations = () => {
  const { ticketId } = useParams();
  const { getData } = useServiceClient();

  const getOrderDetailsData = React.useCallback(
    () =>
      getData(
        `${TicketsEndPoint.FETCH_EMAIL_CONVERSATIONS}?ticket_id=${ticketId}`
      ).then((res) => res.json()),
    [getData, ticketId]
  );
  return useQuery<ITicketById, { message: string }>({
    queryKey: [TicketsQueryKey.FETCH_EMAIL_CONVERSATIONS, ticketId],
    queryFn: getOrderDetailsData,
  });
};
