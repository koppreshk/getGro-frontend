import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';

export interface IAttachments {
  contentType: string;
  fileUrl: string;
  fileName: string;
  attachmentId: string;
}

export interface Conversations {
  messageId: string;
  from: string;
  fromEmail: string;
  to: string;
  toEmail: string;
  createdAt: string;
  htmlContent: string;
  snippet: string;
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
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${TicketsEndPoint.FETCH_EMAIL_CONVERSATIONS}?ticket_id=${ticketId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, ticketId]
  );
  return useQuery<ITicketById, { message: string }>({
    queryKey: [TicketsQueryKey.FETCH_EMAIL_CONVERSATIONS, ticketId],
    queryFn: getOrderDetailsData,
  });
};
