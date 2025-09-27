import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../apis';

interface ISendWhatsAppMessagesArgs {
  messageId: string;
  message?: string;
  fileUrl?: string;
  type: string;
}

export const useSendWhatsAppMessages = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const sendWhatsAppMessage = useCallback(
    (args: ISendWhatsAppMessagesArgs) =>
      postData(TicketsEndPoint.SEND_WHATSAPP_MESSAGES, {
        message_id: args.messageId,
        message: args.message,
        file_url: args.fileUrl,
        type: args.type,
      }).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.SEND_WHATSAPP_MESSAGES],
    mutationFn: sendWhatsAppMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(
        TicketsQueryKey.FETCH_ALL_WHATSAPP_MESSAGES
      );
    },
  });
};
