import { useServiceClient } from 'lib';
import { IGenericResponse } from 'modules/settings/apis/ticket-status/types';
import React from 'react';
import { useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

export const useFetchAllChatStatuses = (isEnabled = true) => {
  const { getData } = useServiceClient();

  const fetchAllStatuses = React.useCallback(
    () =>
      getData(ChatEndPoint.FETCH_ALL_CHAT_STATUSES).then((res) => res.json()),
    [getData]
  );

  return useQuery<IGenericResponse[], { message: string }>({
    queryKey: ChatQueryKeys.FETCH_ALL_CHAT_STATUSES,
    queryFn: fetchAllStatuses,
    enabled: isEnabled,
  });
};
