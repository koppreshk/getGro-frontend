import { useServiceClient } from 'lib';
import React from 'react';
import { useQuery } from 'react-query';

import { ChatEndPoint, ChatQueryKeys } from './api-enums';

export interface MediaContent {}

export const useFetchMediaContent = (mediaId: string) => {
  const { getData } = useServiceClient();

  const fetchMediaContent = React.useCallback(
    () =>
      getData(`${ChatEndPoint.FETCH_MEDIA_CONTENT}?media_id=${mediaId}`).then(
        (res) => res.json()
      ),
    [getData, mediaId]
  );

  return useQuery<MediaContent, { message: string }>({
    queryKey: [ChatQueryKeys.FETCH_MEDIA_CONTENT, mediaId],
    queryFn: fetchMediaContent,
  });
};
