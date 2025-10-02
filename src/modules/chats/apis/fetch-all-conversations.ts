import { useServiceClient } from 'lib';
import React from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

export interface AllChatConversations {
  page: number;
  conversations: ChatConversation[];
  total_pages: number;
}

export enum ChatType {
  WhatsappMessage = 'whatsapp_message',
  InstagramComment = 'instagram_comment',
  InstagramMessage = 'instagram_message',
  FacebookPageComment = 'fb_page_comment',
  FacebookPageMessage = 'fb_page_message',
}
export interface ChatConversation {
  assigned_queue: number | null;
  assigned_agent: number | null;
  chat_source: string;
  chat_type: ChatType;
  created_at: string;
  customer_name: string;
  id: number;
  is_conversation_closed: boolean;
  last_message: LastMessage;
  linked_tickets: LinkedTicket[];
  priority_id: number;
  queue_id: number;
  status_id: number;
  tags: number[];
  post_url: string | null;
  has_seen: boolean;
}

export interface LastMessage {
  message_type: string;
  message: string;
  direction: string;
}

export interface LinkedTicket {
  ticket_id: number;
  status: string;
  description: string;
}

export const useFetchAllConversations = () => {
  const { getData } = useServiceClient();

  const fetchAllDashboardData = React.useCallback(
    () =>
      getData(`${ChatEndPoint.FETCH_ALL_CONVERSATIONS}`).then((res) =>
        res.json()
      ),
    [getData]
  );

  return useQuery<AllChatConversations, { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_ALL_CONVERSATIONS],
    queryFn: fetchAllDashboardData,
  });
};

const ITEMS_PER_PAGE = 10;

export const useInfiniteConversations = () => {
  const { getData } = useServiceClient();

  const fetchChats = async ({ pageParam = 1 }) => {
    const res = await getData(
      `${ChatEndPoint.FETCH_ALL_CONVERSATIONS}?page=${pageParam}&items_per_page=${ITEMS_PER_PAGE}`
    );
    return res.json();
  };

  return useInfiniteQuery<AllChatConversations, { message: string }>(
    [ChatQueryKeys.FETCH_ALL_CONVERSATIONS],
    fetchChats,
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    }
  );
};
