import { useAuth } from 'modules/login';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

import { TicketsEndPoint, TicketsQueryKey } from '../api-enums';

export const useUploadFile = () => {
  const { user } = useAuth();
  const subDomainValue =
    import.meta.env.VITE_SUB_DOMAIN ?? new URL(location.origin).href; //Keeping env values incase of overiding from local

  const uploadFile = useCallback(
    (body: FormData) =>
      fetch(`${import.meta.env.VITE_REST_URL}${TicketsEndPoint.UPLOAD_FILE}`, {
        body: body,
        method: 'post',
        headers: {
          Authorization: user!.authToken,
          'sub-domain': subDomainValue,
        },
      }).then((res) => res.json()),
    [subDomainValue, user]
  );

  return useMutation({
    mutationKey: [TicketsQueryKey.UPLOAD_FILE],
    mutationFn: uploadFile,
  });
};
