import { useServiceClient } from 'lib';
import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './api-enums';

interface PhoneChannelItem {
  number: string;
  channel: string;
}

export type PhoneChannelList = PhoneChannelItem[];

export interface TemplatesResponse {
  status: boolean;
  templates: {
    image_urls: string[];
    templates: {
      name: string;
      template_id: string;
    }[];
  };
}

export const useFetchWABANumbers = () => {
  const { getData } = useServiceClient();

  const fetchAllPriorities = React.useCallback(
    () => getData(ChatEndPoint.FETCH_WABA_NUMBERS).then((res) => res.json()),
    [getData]
  );

  return useQuery<PhoneChannelList, { message: string }>({
    queryKey: ChatQueryKeys.FETCH_WABA_NUMBERS,
    queryFn: fetchAllPriorities,
  });
};

export const useFetchTemplates = (channelId: string) => {
  const { getData } = useServiceClient();

  const fetchAllPriorities = React.useCallback(
    () =>
      getData(`${ChatEndPoint.FETCH_WABA_TEMPLATES}?channel=${channelId}`).then(
        (res) => res.json()
      ),
    [channelId, getData]
  );

  return useQuery<TemplatesResponse, { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_WABA_TEMPLATES, channelId],
    queryFn: fetchAllPriorities,
    enabled: !!channelId,
  });
};

interface ISendChatReplyArgs {
  to_numbers: string[];
  template_name: string;
  mime_type?: string;
  channel: string;
  image_url?: string;
}

export const useSendTemplate = () => {
  const { postData } = useServiceClient();
  const queryClient = useQueryClient();

  const sendChatReply = useCallback(
    (args: ISendChatReplyArgs) =>
      postData(ChatEndPoint.SEND_TEMPLATE, args).then((res) => res.json()),
    [postData]
  );

  return useMutation({
    mutationKey: [ChatQueryKeys.SEND_TEMPLATE],
    mutationFn: sendChatReply,
    onSuccess: () => {
      queryClient.invalidateQueries(ChatQueryKeys.FETCH_CONVERSATION_BY_ID);
    },
  });
};
