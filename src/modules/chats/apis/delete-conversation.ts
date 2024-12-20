import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from '.';

interface IDeleteConversationArgs {
  conversation_id: number;
}

export const useDeleteConversation = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const deleteConversation = useCallback(
    (args: IDeleteConversationArgs) =>
      postData(ChatEndPoint.DELETE_CONVERSATION, args).then((res) =>
        res.json()
      ),
    [postData]
  );

  return useMutation({
    mutationKey: [ChatQueryKeys.DELETE_CONVERSATION],
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
    },
  });
};
