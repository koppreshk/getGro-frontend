import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './api-enums';

interface PhoneChannelItem {
  number: string;
  channel: string;
}

export type PhoneChannelList = PhoneChannelItem[];

export interface TemplatesResponse {
  status: boolean;
  templates: string[];
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
