import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ChatQueryKeys, ChatEndPoint } from './apis';

interface IUpdatePriorityArgs {
  conversationId: number | string;
  priorityId: number;
}

export const useUpdateChatPriority = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const updatePriority = useCallback(
    (args: IUpdatePriorityArgs) =>
      postData(
        `${ChatEndPoint.UPDATE_CHAT_PRIORITY}?conversation_id=${args.conversationId}&priority_id=${args.priorityId}`
      ).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [ChatQueryKeys.UPDATE_CHAT_PRIORITY],
    mutationFn: updatePriority,
    onSuccess: () => {
      queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
    },
  });
};
