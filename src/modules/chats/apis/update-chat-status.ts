import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ChatQueryKeys, ChatEndPoint } from './api-enums';

interface IUpdateStatusArgs {
  conversationId: number | string;
  statusId: number;
}

export const useUpdateChatStatus = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const updateStatus = useCallback(
    (args: IUpdateStatusArgs) =>
      postData(
        `${ChatEndPoint.UPDATE_CHAT_STATUS}?conversation_id=${args.conversationId}&status_id=${args.statusId}`
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [ChatQueryKeys.UPDATE_CHAT_STATUS],
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
    },
  });
};
