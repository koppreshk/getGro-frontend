import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

interface ChatHistoryResponse {
  created_at: string;
  history: string;
  user: string;
}

export const useFetchChatHistory = (conversationId: string) => {
  const { getData } = useServiceClient();

  const fetchChatHistory = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ChatEndPoint.FETCH_CHAT_HISTORY}?conversation_id=${conversationId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [conversationId, getData]
  );

  return useQuery<ChatHistoryResponse[], { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_CHAT_HISTORY, conversationId],
    queryFn: fetchChatHistory,
  });
};
