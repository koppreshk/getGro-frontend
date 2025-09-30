import { useServiceClient } from 'lib';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

export const useFetchAllChatPriorities = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllPriorities = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData(ChatEndPoint.FETCH_ALL_CHAT_PRIORITIES, undefined, {
        signal,
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IGenericResponse[], { message: string }>({
    queryKey: ChatQueryKeys.FETCH_ALL_CHAT_PRIORITIES,
    queryFn: fetchAllPriorities,
    enabled: isEnabled,
  });
};
