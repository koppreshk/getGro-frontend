import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './apis';

export interface MediaContent {}

export const useFetchMediaContent = (mediaId: string) => {
  const { getData } = useServiceClient();

  const fetchMediaContent = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: `${ChatEndPoint.FETCH_MEDIA_CONTENT}?media_id=${mediaId}`,
        extra: { signal },
      }).then((res) => res.json()),
    [getData, mediaId]
  );

  return useQuery<MediaContent, { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_MEDIA_CONTENT, mediaId],
    queryFn: fetchMediaContent,
  });
};
