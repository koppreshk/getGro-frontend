import { useServiceClient } from 'lib';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

export const useFetchAllChatTags = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllTags = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: ChatEndPoint.FETCH_ALL_CHAT_TAGS,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IGenericResponse[], { message: string }>({
    queryKey: ChatQueryKeys.FETCH_ALL_CHAT_TAGS,
    queryFn: fetchAllTags,
    enabled: isEnabled,
  });
};
