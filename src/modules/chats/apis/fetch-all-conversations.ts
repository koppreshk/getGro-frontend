import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

import { ChatEndPoint, ChatQueryKeys } from './api-enums';

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
  const [searchParams] = useSearchParams();

  const urlFilters = React.useMemo(() => {
    const apiURLMappedKeys = {
      pageNumber: 'page',
      noOfRecords: 'items_per_page',
    };
    const filters: Record<string, string> = {};
    const keys: (keyof typeof apiURLMappedKeys)[] = [
      'pageNumber',
      'noOfRecords',
    ];
    keys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) {
        filters[apiURLMappedKeys[key]] = val;
      }
    });
    return filters;
  }, [searchParams]);

  const queryString = React.useMemo(() => {
    return Object.entries(urlFilters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&');
  }, [urlFilters]);

  const fetchAllDashboardData = React.useCallback(
    () =>
      getData(`${ChatEndPoint.FETCH_ALL_CONVERSATIONS}?${queryString}`).then(
        (res) => res.json()
      ),
    [getData, queryString]
  );

  return useQuery<AllChatConversations, { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_ALL_CONVERSATIONS, queryString],
    queryFn: fetchAllDashboardData,
    enabled: queryString.length > 0,
  });
};
