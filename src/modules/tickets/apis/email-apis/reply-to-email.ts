import { useNotifications, useServiceClient } from 'lib';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

export interface IReplyToEmailArgs {
  messageId: string;
  htmlContent: string;
  snippet: string;
  threadId: string;
  attachments?: {
    file_name: string;
    file_content: string;
    file_type: string;
  }[];
}

export const useReplyToEmail = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();
  const { showNotification } = useNotifications();

  const replyToEmail = React.useCallback(
    (args: IReplyToEmailArgs) => {
      return postData(`${TicketsEndPoint.REPLY_TO_EMAIL}`, {
        body: args.htmlContent,
        message_id: args.messageId,
        attachments: args.attachments,
        thread_id: args.threadId,
        snippet: args.snippet,
      })
        .then((res) => res.json())
        .then(() =>
          showNotification({ message: 'Reply Sent', type: 'success' })
        )
        .catch(() =>
          showNotification({
            message: 'Failed to send a reply, try again later',
            type: 'error',
          })
        );
    },
    [postData, showNotification]
  );

  return useMutation({
    mutationFn: replyToEmail,
    mutationKey: [TicketsQueryKey.REPLY_TO_EMAIL],
    onSuccess: () => {
      queryClient.invalidateQueries(TicketsQueryKey.FETCH_EMAIL_CONVERSATIONS);
    },
  });
};
