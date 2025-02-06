/* eslint-disable @typescript-eslint/no-explicit-any */
import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './api-enums';

export interface ChatConversationById {
  is_expired: boolean;
  profile_name: string;
  profile_number: string;
  messages: Message[];
  conversation_id: number;
}

export type MessageType = 'image' | 'text' | 'video' | 'audio' | 'document';

export interface Message {
  message_type: MessageType;
  message?: string;
  direction: string;
  status: string;
  created_at: string;
  replied_by: string;
  caption: null | string;
  media_url?: string;
  mime_type?: string;
  filename?: string;
}

export const useFetchConversationById = (id?: string) => {
  const { getData } = useServiceClient();

  const fetchAllDashboardData = React.useCallback(
    () =>
      getData(
        `${ChatEndPoint.FETCH_CONVERSATION_BY_ID}?conversation_id=${id}`
      ).then((res) => res.json()),
    [getData, id]
  );

  return useQuery<ChatConversationById, { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_CONVERSATION_BY_ID, id],
    queryFn: fetchAllDashboardData,
    enabled: !!id,
  });
};
