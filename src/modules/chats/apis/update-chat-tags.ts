import { useServiceClient } from 'lib';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './api-enums';

interface IUpdateTagsArgs {
  conversation_id: number;
  tag_ids: (number | string)[];
}

export const useUpdateChatTags = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const updateTags = useCallback(
    (args: IUpdateTagsArgs) =>
      postData(ChatEndPoint.UPDATE_CHAT_TAGS, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [ChatQueryKeys.UPDATE_CHAT_TAGS],
    mutationFn: updateTags,
    onSuccess: () => {
      queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
    },
  });
};
