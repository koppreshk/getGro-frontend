import { useAuth } from 'modules/login';
import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { KnowledgeBaseEndPoint, KnowledgeBaseQueryKeys } from './api-enums';

export const useCreateKBArticle = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const subDomainValue =
    import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

  const uploadFile = useCallback(
    (body: FormData) =>
      fetch(
        `${import.meta.env.VITE_REST_URL}${KnowledgeBaseEndPoint.CREATE_KB_ARTCLE}`,
        {
          body: body,
          method: 'post',
          headers: {
            'sub-domain': subDomainValue,
            Authorization: user!.authToken,
          },
        }
      ).then((res) => res.json()),
    [subDomainValue, user]
  );

  return useMutation({
    mutationKey: [KnowledgeBaseQueryKeys.CREATE_KB_ARTCLE],
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries(KnowledgeBaseQueryKeys.FETCH_ALL_KB);
    },
  });
};
