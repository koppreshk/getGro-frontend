import { useServiceClient } from 'lib';
import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

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

export interface ISendChatReplyArgs {
  template_name: string;
  template_id: string;
  mime_type?: string;
  channel: string;
  image_url?: string;
  phone_number?: string;
  to_numbers: string[];
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
      queryClient.invalidateQueries(ChatQueryKeys.FETCH_ALL_CONVERSATIONS);
    },
  });
};

export interface CampaignMessage {
  has_image: boolean;
  body: string;
  buttons: string[];
}

export const useFetchTemplateById = (templateId: string, channel: string) => {
  const { getData } = useServiceClient();

  const fetchTemplateById = useCallback(
    () =>
      getData(
        `${ChatEndPoint.FETCH_WABA_TEMPLATE_BY_ID}?template_id=${templateId}&channel=${channel}`
      ).then((res) => res.json()),
    [getData, templateId, channel]
  );

  return useQuery<CampaignMessage>({
    queryKey: [ChatQueryKeys.FETCH_WABA_TEMPLATE_BY_ID, templateId, channel],
    queryFn: fetchTemplateById,
    enabled: !!templateId,
  });
};
