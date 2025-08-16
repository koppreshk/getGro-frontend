import { ChatEndPoint } from 'modules/chats/apis';
import { useAuth } from 'modules/login';
import React from 'react';
import { useMutation } from 'react-query';

export const useUploadaTemplateImages = () => {
  const { user } = useAuth();
  const subDomainValue =
    import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

  const createWebForm = React.useCallback(
    (body: FormData) =>
      fetch(
        `${import.meta.env.VITE_REST_URL}${ChatEndPoint.UPLOAD_TEMPLATE_IMAGE}`,
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
    mutationKey: ChatEndPoint.UPLOAD_TEMPLATE_IMAGE,
    mutationFn: createWebForm,
  });
};
