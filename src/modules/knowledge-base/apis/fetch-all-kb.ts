import { useServiceClient } from 'lib';
import React from 'react';
import { QueryFunctionContext, useQuery } from 'react-query';

import { KnowledgeBaseEndPoint, KnowledgeBaseQueryKeys } from './apis';

export interface IKnowledgeBase {
  id: number;
  title: string;
  url: string;
  created_at: string;
  added_by: string;
}

export const useFetchAllKB = () => {
  const { getData } = useServiceClient();

  const allKb = React.useCallback(
    ({ signal }: QueryFunctionContext) =>
      getData({
        endPoint: KnowledgeBaseEndPoint.FETCH_ALL_KB,
        extra: { signal },
      }).then((res) => res.json()),
    [getData]
  );

  return useQuery<IKnowledgeBase[], { message: string }>({
    queryFn: allKb,
    queryKey: KnowledgeBaseQueryKeys.FETCH_ALL_KB,
  });
};
